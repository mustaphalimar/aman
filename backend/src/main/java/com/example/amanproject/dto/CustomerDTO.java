package com.example.amanproject.dto;


import java.math.BigDecimal;

public class CustomerDTO {
    private Long id; // optional for display or update
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password; // only used when creating
    private String deviceType; // for display
    private BigDecimal totalPaid; // for display
    private Long deviceCount; // for display

    public CustomerDTO(Long id, String firstName, String lastName, String phone, String email, String password, String deviceType, BigDecimal totalPaid, Long deviceCount) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.deviceType = deviceType;
        this.totalPaid = totalPaid;
        this.deviceCount = deviceCount;
    }


// Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public BigDecimal getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(BigDecimal totalPaid) {
        this.totalPaid = totalPaid;
    }

    public Long getDeviceCount() {
        return deviceCount;
    }

    public void setDeviceCount(Long deviceCount) {
        this.deviceCount = deviceCount;
    }
}

