package com.estateflow.installment.model;

import java.math.BigDecimal;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

class InstallmentPlanTest {
    @Test void validatesExactDecimalBalance() {
        var plan = new InstallmentPlan();
        plan.setTotalPrice(new BigDecimal("1000000.00"));
        plan.setDownPayment(new BigDecimal("400000.00"));
        plan.setInstallmentAmount(new BigDecimal("50000.00"));
        plan.setNumberOfInstallments(12);
        assertThat(plan.isBalanced()).isTrue();
        plan.setInstallmentAmount(new BigDecimal("50000.01"));
        assertThat(plan.isBalanced()).isFalse();
    }
}
