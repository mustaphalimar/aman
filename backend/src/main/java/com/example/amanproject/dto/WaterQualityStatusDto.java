package com.example.amanproject.dto;

public class WaterQualityStatusDto {

    private double pH;
    private double turbidity;
    private double temperature;
    private double tds;
    private double chlorineLevel;
    private String status; // Normal, Warning, Danger

    public WaterQualityStatusDto() {
    }

    public WaterQualityStatusDto(double pH, double turbidity, double temperature, double tds, double chlorineLevel, String status) {
        this.pH = pH;
        this.turbidity = turbidity;
        this.temperature = temperature;
        this.tds = tds;
        this.chlorineLevel = chlorineLevel;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
