package com.example.amanproject.dto.mobileDtos;


import java.time.LocalDate;

public class HistoricalWaterQualityDto {

    private Double pH;
    private Double turbidity;
    private Double temperature;
    private Double tds;
    private Double chlorineLevel;
    private LocalDate date;

    public HistoricalWaterQualityDto() {
    }

    public HistoricalWaterQualityDto(LocalDate date,Double pH, Double turbidity, Double temperature, Double tds, Double chlorineLevel) {
        this.pH = pH;
        this.turbidity = turbidity;
        this.temperature = temperature;
        this.tds = tds;
        this.chlorineLevel = chlorineLevel;
        this.date = date;
    }

    public Double getpH() {
        return pH;
    }

    public void setpH(Double pH) {
        this.pH = pH;
    }

    public Double getTurbidity() {
        return turbidity;
    }

    public void setTurbidity(Double turbidity) {
        this.turbidity = turbidity;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getTds() {
        return tds;
    }

    public void setTds(Double tds) {
        this.tds = tds;
    }

    public Double getChlorineLevel() {
        return chlorineLevel;
    }

    public void setChlorineLevel(Double chlorineLevel) {
        this.chlorineLevel = chlorineLevel;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


}
