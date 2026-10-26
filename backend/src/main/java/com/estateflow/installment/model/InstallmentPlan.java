package com.estateflow.installment.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.estateflow.property.model.Property;
import java.math.BigDecimal;

@Entity
@Table(name = "installment_plans")
public class InstallmentPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "property_id", nullable = false, unique = true)
    private Property property;

    @NotNull
    @DecimalMin("0.01")
    @Digits(integer = 13, fraction = 2)
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal totalPrice;

    @NotNull
    @DecimalMin("0.00")
    @Digits(integer = 13, fraction = 2)
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal downPayment;

    @NotNull
    @DecimalMin("0.01")
    @Digits(integer = 13, fraction = 2)
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal installmentAmount;

    @Min(1)
    @Max(1200)
    @Column(nullable = false)
    private int numberOfInstallments;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private PaymentFrequency paymentFrequency;

    @Size(max = 2000)
    @Column(length = 2000)
    private String description;

    protected InstallmentPlan() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
    public BigDecimal getDownPayment() { return downPayment; }
    public void setDownPayment(BigDecimal downPayment) { this.downPayment = downPayment; }
    public BigDecimal getInstallmentAmount() { return installmentAmount; }
    public void setInstallmentAmount(BigDecimal installmentAmount) { this.installmentAmount = installmentAmount; }
    public int getNumberOfInstallments() { return numberOfInstallments; }
    public void setNumberOfInstallments(int numberOfInstallments) { this.numberOfInstallments = numberOfInstallments; }
    public PaymentFrequency getPaymentFrequency() { return paymentFrequency; }
    public void setPaymentFrequency(PaymentFrequency paymentFrequency) { this.paymentFrequency = paymentFrequency; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    @AssertTrue(message = "Down payment and installments must equal total price")
    public boolean isBalanced() {
        if (totalPrice == null || downPayment == null || installmentAmount == null) return true;
        return downPayment.add(installmentAmount.multiply(BigDecimal.valueOf(numberOfInstallments)))
                .compareTo(totalPrice) == 0;
    }

}
