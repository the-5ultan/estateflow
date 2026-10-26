package com.estateflow;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

// Use only an empty, disposable database. Spring runs Flyway and Hibernate validation on startup.
@SpringBootTest
@EnabledIfEnvironmentVariable(named = "RUN_MYSQL_TESTS", matches = "true")
@Transactional
class DatabaseIntegrationTest {
    @Autowired Flyway flyway;
    @Autowired JdbcTemplate jdbc;

    @Test void migrationAndHibernateMappingsAgreeOnMySql() {
        assertThat(flyway.info().current().getVersion().getVersion()).isEqualTo("1");
        assertThat(flyway.validateWithResult().validationSuccessful).isTrue();
        assertThat(jdbc.queryForObject("SELECT COUNT(*) FROM users", Integer.class)).isZero();
        assertThat(jdbc.queryForObject("SELECT COUNT(*) FROM properties", Integer.class)).isZero();
    }

    @Test void schemaAllowsPrivateSoldPropertiesWithPartialPayment() {
        long propertyId = insertProperty();
        jdbc.update("UPDATE properties SET listing_status='SOLD', payment_status='PARTIAL' WHERE id=?", propertyId);
        assertThat(jdbc.queryForObject("SELECT visibility FROM properties WHERE id=?", String.class, propertyId))
                .isEqualTo("PRIVATE");
        assertThat(jdbc.queryForObject("SELECT payment_status FROM properties WHERE id=?", String.class, propertyId))
                .isEqualTo("PARTIAL");
    }

    @Test void schemaPreventsMultipleCoverImages() {
        long propertyId = insertProperty();
        jdbc.update("INSERT INTO property_images (property_id,cloudinary_public_id,image_url,alt_text,display_order,cover_image) VALUES (?, 'test-cover-1', 'https://example.com/1.jpg', 'Test image', 0, TRUE)", propertyId);
        assertThatThrownBy(() -> jdbc.update("INSERT INTO property_images (property_id,cloudinary_public_id,image_url,alt_text,display_order,cover_image) VALUES (?, 'test-cover-2', 'https://example.com/2.jpg', 'Test image', 1, TRUE)", propertyId))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test void schemaRejectsUnbalancedInstallments() {
        long propertyId = insertProperty();
        assertThatThrownBy(() -> jdbc.update("INSERT INTO installment_plans (property_id,total_price,down_payment,installment_amount,number_of_installments,payment_frequency) VALUES (?,100,10,10,8,'MONTHLY')", propertyId))
                .isInstanceOf(DataAccessException.class).hasStackTraceContaining("ck_installment_balance");
    }

    private long insertProperty() {
        jdbc.update("INSERT INTO users (name,email,google_id,role,account_status,created_at,updated_at) VALUES ('Test agent','agent@example.test','test-google-id','AGENT','ACTIVE',UTC_TIMESTAMP(6),UTC_TIMESTAMP(6))");
        long userId = jdbc.queryForObject("SELECT id FROM users WHERE google_id='test-google-id'", Long.class);
        jdbc.update("INSERT INTO agent_profiles (user_id,agency_name,phone_number,city,created_at,updated_at) VALUES (?, 'Test agency', '+923001234567','Karachi',UTC_TIMESTAMP(6),UTC_TIMESTAMP(6))", userId);
        long agentId = jdbc.queryForObject("SELECT id FROM agent_profiles WHERE user_id=?", Long.class, userId);
        jdbc.update("""
                INSERT INTO properties (agent_id,title,slug,description,property_type,listing_purpose,price,
                    city,area,address,property_size,size_unit,created_at,updated_at)
                VALUES (?, 'Test property','test-property','Integration test fixture','HOUSE','SALE',100,
                    'Karachi','DHA','Test address',5,'MARLA',UTC_TIMESTAMP(6),UTC_TIMESTAMP(6))
                """, agentId);
        return jdbc.queryForObject("SELECT id FROM properties WHERE slug='test-property'", Long.class);
    }
}
