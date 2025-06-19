package com.example.amanproject.dto;

public class WaterQualityStatusDto {
    private Double pH;
    private Double turbidity;
    private Double temperature;
    private Double tds;
    private Double chlorineLevel;
    private String status;

    public WaterQualityStatusDto() {
    }

    // Constructor that handles null values properly
    public WaterQualityStatusDto(Double pH, Double turbidity, Double temperature,
                                 Double tds, Double chlorineLevel, String status) {
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
