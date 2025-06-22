package com.example.amanproject.model;

import com.example.amanproject.enums.DeviceStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(nullable = false)
    private String deviceName;

    @Column(nullable = false)
    private String deviceType;

    //@Column(nullable = false, unique = true)
    private String qrCode; // Used for authentication

    @Enumerated(EnumType.STRING)
    private DeviceStatus status; // ACTIVE, INACTIVE

    @CreationTimestamp
    private Timestamp createdAt;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "device_sensor",
            joinColumns = @JoinColumn(name = "device_id"),
            inverseJoinColumns = @JoinColumn(name = "sensor_id")
    )
    private List<Sensor> sensors = new ArrayList<>();

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<WaterQualityData> waterQualityData = new ArrayList<>();

    // Getters & Setters


    public Device() {
    }

    public Device(User user, String deviceName, String deviceType, List<Sensor> sensors) {
        this.user = user;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.sensors = sensors != null ? sensors : new ArrayList<>();
        this.status = DeviceStatus.ACTIVE;
        this.qrCode = generateQRCode();
    }

    private String generateQRCode() {
        return "QR_" + System.currentTimeMillis() + "_" + (int)(Math.random() * 1000);
    }

    public BigDecimal calculateTotalPrice() {
        return sensors.stream()
                .map(Sensor::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public DeviceStatus getStatus() {
        return status;
    }

    public void setStatus(DeviceStatus status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<WaterQualityData> getWaterQualityData() {
        return waterQualityData;
    }

    public void setWaterQualityData(List<WaterQualityData> waterQualityData) {
        this.waterQualityData = waterQualityData;
    }

    public List<Sensor> getSensors() { return sensors; }
    public void setSensors(List<Sensor> sensors) { this.sensors = sensors; }

}

