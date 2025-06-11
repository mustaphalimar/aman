package com.example.amanproject.model;

import com.example.amanproject.enums.DeviceStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "Device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
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

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL)
    private List<WaterQualityData> waterQualityData;

    // Getters & Setters


    public Device() {
    }

    public Device(Long id, User user, String deviceName, String deviceType, String qrCode, DeviceStatus status, Timestamp createdAt, List<WaterQualityData> waterQualityData) {
        this.id = id;
        this.user = user;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.qrCode = qrCode;
        this.status = status;
        this.createdAt = createdAt;
        this.waterQualityData = waterQualityData;
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
}

