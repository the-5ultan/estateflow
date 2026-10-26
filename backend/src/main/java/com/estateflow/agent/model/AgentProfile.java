package com.estateflow.agent.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.estateflow.common.BaseEntity;
import com.estateflow.user.model.User;

@Entity
@Table(name = "agent_profiles")
public class AgentProfile extends BaseEntity {
    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @NotBlank
    @Size(max = 160)
    @Column(nullable = false, length = 160)
    private String agencyName;

    @Pattern(regexp = "\\+92[0-9]{10}")
    @NotBlank
    @Size(max = 16)
    @Column(nullable = false, length = 16)
    private String phoneNumber;

    @Pattern(regexp = "\\+92[0-9]{10}")
    @Size(max = 16)
    @Column(length = 16)
    private String whatsappNumber;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String city;

    @Size(max = 500)
    @Column(length = 500)
    private String officeAddress;

    @Size(max = 2000)
    @Column(length = 2000)
    private String bio;

    protected AgentProfile() {}

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getAgencyName() { return agencyName; }
    public void setAgencyName(String agencyName) { this.agencyName = agencyName; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String officeAddress) { this.officeAddress = officeAddress; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

}
