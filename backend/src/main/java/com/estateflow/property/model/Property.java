package com.estateflow.property.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.estateflow.common.BaseEntity;
import com.estateflow.agent.model.AgentProfile;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "properties")
public class Property extends BaseEntity {
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "agent_id", nullable = false)
    private AgentProfile agent;

    @NotBlank
    @Size(max = 180)
    @Column(nullable = false, length = 180)
    private String title;

    @NotBlank
    @Size(max = 220)
    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @NotBlank
    @Size(max = 20000)
    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private PropertyType propertyType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private ListingPurpose listingPurpose;

    @NotNull
    @DecimalMin("0.00")
    @Digits(integer = 13, fraction = 2)
    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank
    @Size(max = 160)
    @Column(nullable = false, length = 160)
    private String area;

    @Size(max = 160)
    @Column(length = 160)
    private String neighborhood;

    @NotBlank
    @Size(max = 500)
    @Column(nullable = false, length = 500)
    private String address;

    @Min(0)
    @Column(nullable = false)
    private int bedrooms;

    @Min(0)
    @Column(nullable = false)
    private int bathrooms;

    @Min(0)
    @Column(nullable = false)
    private int kitchens;

    @Min(0)
    @Column(nullable = false)
    private int parkingSpaces;

    @NotNull
    @DecimalMin("0.01")
    @Digits(integer = 10, fraction = 2)
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal propertySize;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private SizeUnit sizeUnit;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private ListingStatus listingStatus = ListingStatus.AVAILABLE;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private PaymentStatus paymentStatus = PaymentStatus.NOT_APPLICABLE;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private PaymentOption paymentOption = PaymentOption.FULL_PAYMENT;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 24, columnDefinition = "varchar(24)")
    private Visibility visibility = Visibility.PRIVATE;

    @Column(nullable = false)
    private boolean featured;

    @Column
    private Instant publishedAt;

    @Column
    private Instant archivedAt;

    protected Property() {}

    public AgentProfile getAgent() { return agent; }
    public void setAgent(AgentProfile agent) { this.agent = agent; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public PropertyType getPropertyType() { return propertyType; }
    public void setPropertyType(PropertyType propertyType) { this.propertyType = propertyType; }
    public ListingPurpose getListingPurpose() { return listingPurpose; }
    public void setListingPurpose(ListingPurpose listingPurpose) { this.listingPurpose = listingPurpose; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public int getBedrooms() { return bedrooms; }
    public void setBedrooms(int bedrooms) { this.bedrooms = bedrooms; }
    public int getBathrooms() { return bathrooms; }
    public void setBathrooms(int bathrooms) { this.bathrooms = bathrooms; }
    public int getKitchens() { return kitchens; }
    public void setKitchens(int kitchens) { this.kitchens = kitchens; }
    public int getParkingSpaces() { return parkingSpaces; }
    public void setParkingSpaces(int parkingSpaces) { this.parkingSpaces = parkingSpaces; }
    public BigDecimal getPropertySize() { return propertySize; }
    public void setPropertySize(BigDecimal propertySize) { this.propertySize = propertySize; }
    public SizeUnit getSizeUnit() { return sizeUnit; }
    public void setSizeUnit(SizeUnit sizeUnit) { this.sizeUnit = sizeUnit; }
    public ListingStatus getListingStatus() { return listingStatus; }
    public void setListingStatus(ListingStatus listingStatus) { this.listingStatus = listingStatus; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public PaymentOption getPaymentOption() { return paymentOption; }
    public void setPaymentOption(PaymentOption paymentOption) { this.paymentOption = paymentOption; }
    public Visibility getVisibility() { return visibility; }
    public void setVisibility(Visibility visibility) { this.visibility = visibility; }
    public boolean getFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public Instant getPublishedAt() { return publishedAt; }
    public void setPublishedAt(Instant publishedAt) { this.publishedAt = publishedAt; }
    public Instant getArchivedAt() { return archivedAt; }
    public void setArchivedAt(Instant archivedAt) { this.archivedAt = archivedAt; }

}
