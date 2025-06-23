package com.example.amanproject.dto.device;

import com.example.amanproject.enums.DeviceStatus;
import lombok.Data;

@Data
public class DeviceDTO {
    private Long userId;
    private String deviceName;
    private String deviceType;
    private String qrCode;
    private DeviceStatus status;

    public DeviceDTO() {
    }

    public DeviceDTO(Long userId, String deviceName, String deviceType, String qrCode, DeviceStatus status) {
        this.userId = userId;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.qrCode = qrCode;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
}


