package com.example.amanproject.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class SensorDTO {

    private Long id;
    private String sensorName;
    private String description;
    private BigDecimal price;
    private Timestamp createdAt;

    public SensorDTO() {
    }

    public SensorDTO(Long id, String sensorName, String description, BigDecimal price, Timestamp createdAt) {
        this.id = id;
        this.sensorName = sensorName;
        this.description = description;
        this.price = price;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSensorName() {
        return sensorName;
    }

    public void setSensorName(String sensorName) {
        this.sensorName = sensorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
