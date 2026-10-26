package com.estateflow.media.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.estateflow.property.model.Property;

@Entity
@Table(name = "property_images")
public class PropertyImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, unique = true, length = 255)
    private String cloudinaryPublicId;

    @Pattern(regexp = "https://.+")
    @NotBlank
    @Size(max = 2048)
    @Column(nullable = false, length = 2048)
    private String imageUrl;

    @NotBlank
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String altText;

    @Min(0)
    @Column(nullable = false)
    private int displayOrder;

    @Column(nullable = false)
    private boolean coverImage;

    protected PropertyImage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }
    public String getCloudinaryPublicId() { return cloudinaryPublicId; }
    public void setCloudinaryPublicId(String cloudinaryPublicId) { this.cloudinaryPublicId = cloudinaryPublicId; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }
    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public boolean getCoverImage() { return coverImage; }
    public void setCoverImage(boolean coverImage) { this.coverImage = coverImage; }

}
