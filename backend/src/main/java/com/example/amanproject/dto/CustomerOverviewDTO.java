package com.example.amanproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;



public class CustomerOverviewDTO {

    private String name;
    private String email;
    private String deviceType;
    private BigDecimal totalPaid;
    private long deviceCount;

    public CustomerOverviewDTO(String name, String email, String deviceType, BigDecimal totalPaid, long deviceCount) {
        this.name = name;
        this.email = email;
        this.deviceType = deviceType;
        this.totalPaid = totalPaid;
        this.deviceCount = deviceCount;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public BigDecimal getTotalPaid() {
        return totalPaid;
    }

    public Long getDeviceCount() {
        return deviceCount;
    }

    // Getters and Setters
}

