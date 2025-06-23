package com.example.amanproject.dto.device;

import com.example.amanproject.dto.whaterquality.WaterQualityStatusDto;
import com.example.amanproject.model.Sensor;

import java.util.List;

public class DeviceWithSensorsAndQualityDto {
    private Long deviceId;
    private String deviceName;
    private String deviceType;
    private List<Sensor> sensors;
    private WaterQualityStatusDto latestWaterQuality;

    public DeviceWithSensorsAndQualityDto() {
    }

    public DeviceWithSensorsAndQualityDto(Long deviceId, String deviceName, String deviceType, List<Sensor> sensors, WaterQualityStatusDto latestWaterQuality) {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.sensors = sensors;
        this.latestWaterQuality = latestWaterQuality;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
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

    public List<Sensor> getSensors() {
        return sensors;
    }

    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
    }

    public WaterQualityStatusDto getLatestWaterQuality() {
        return latestWaterQuality;
    }

    public void setLatestWaterQuality(WaterQualityStatusDto latestWaterQuality) {
        this.latestWaterQuality = latestWaterQuality;
    }
}
