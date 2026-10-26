package com.estateflow.property.model;

import jakarta.validation.Validation;
import jakarta.validation.ValidatorFactory;
import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class PropertyValidationTest {
    @Test void defaultsToPrivateAndAllowsIndependentStatuses() {
        var property = new Property();
        assertThat(property.getVisibility()).isEqualTo(Visibility.PRIVATE);
        property.setListingStatus(ListingStatus.SOLD);
        property.setPaymentStatus(PaymentStatus.PARTIAL);
        assertThat(property.getVisibility()).isEqualTo(Visibility.PRIVATE);
        assertThat(property.getListingStatus()).isEqualTo(ListingStatus.SOLD);
        assertThat(property.getPaymentStatus()).isEqualTo(PaymentStatus.PARTIAL);
    }

    @Test void rejectsNegativePricesAndZeroSize() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            var property = new Property();
            property.setPrice(new BigDecimal("-1.00"));
            property.setPropertySize(BigDecimal.ZERO);
            var paths = factory.getValidator().validate(property).stream()
                    .map(error -> error.getPropertyPath().toString()).toList();
            assertThat(paths).contains("price", "propertySize", "title", "agent");
        }
    }
}
