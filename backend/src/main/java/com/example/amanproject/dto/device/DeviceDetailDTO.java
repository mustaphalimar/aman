package com.example.amanproject.dto.device;

import com.example.amanproject.dto.SensorDTO;

import java.sql.Timestamp;
import java.util.List;

public class DeviceDetailDTO {
    private Long id;
    private String deviceName;
    private String deviceType;
    private String qrCode;
    private String status;
    private Timestamp createdAt;
    private List<SensorDTO> sensors;

    public DeviceDetailDTO() {
    }

    public DeviceDetailDTO(Long id, String deviceName, String deviceType, String qrCode, String status, Timestamp createdAt, List<SensorDTO> sensors) {
        this.id = id;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.qrCode = qrCode;
        this.status = status;
        this.createdAt = createdAt;
        this.sensors = sensors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<SensorDTO> getSensors() {
        return sensors;
    }

    public void setSensors(List<SensorDTO> sensors) {
        this.sensors = sensors;
    }
}
