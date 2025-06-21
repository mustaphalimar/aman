package com.example.amanproject.dto;

import com.example.amanproject.enums.DeviceStatus;
import lombok.Data;

@Data
public class DeviceDTO {
    private Long userId;
    private String deviceName;
    private String deviceType;
    private String qrCode;
    private DeviceStatus status;
}


