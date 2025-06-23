package com.example.amanproject.dto.whaterquality;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaterQualityDataDto {
    private Long deviceId;
    private double pH;
    private double turbidity;
    private double temperature;
    private double tds;
    private double chlorineLevel;

    public WaterQualityDataDto() {
    }

    public WaterQualityDataDto(Long deviceId, double pH, double turbidity, double temperature, double tds, double chlorineLevel) {
        this.deviceId = deviceId;
        this.pH = pH;
        this.turbidity = turbidity;
        this.temperature = temperature;
        this.tds = tds;
        this.chlorineLevel = chlorineLevel;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public double getpH() {
        return pH;
    }

    public void setpH(double pH) {
        this.pH = pH;
    }

    public double getTurbidity() {
        return turbidity;
    }

    public void setTurbidity(double turbidity) {
        this.turbidity = turbidity;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getTds() {
        return tds;
    }

    public void setTds(double tds) {
        this.tds = tds;
    }

    public double getChlorineLevel() {
        return chlorineLevel;
    }

    public void setChlorineLevel(double chlorineLevel) {
        this.chlorineLevel = chlorineLevel;
    }
}
