package com.example.amanproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "Sensor")
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sensorName;

    @Column
    private String description;

    @Column(nullable = false)
    private BigDecimal price; // Price for this sensor



    @CreationTimestamp
    private Timestamp createdAt;

    // Many-to-many relationship with devices
    @ManyToMany(mappedBy = "sensors")
    @JsonIgnore
    private List<Device> devices;

    public Sensor() {
    }

    public Sensor(String sensorName, String description, BigDecimal price) {
        this.sensorName = sensorName;
        this.description = description;
        this.price = price;
    }

    public Sensor(Long id, String sensorName, String description, BigDecimal price, Timestamp createdAt, List<Device> devices) {
        this.id = id;
        this.sensorName = sensorName;
        this.description = description;
        this.price = price;
        this.createdAt = createdAt;
        this.devices = devices;
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

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }
}
