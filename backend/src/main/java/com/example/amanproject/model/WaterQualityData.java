package com.example.amanproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
public class WaterQualityData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Device device;

    private double pH;
    private double turbidity;
    private double temperature;
    private double tds; // Total Dissolved Solids
    private double chlorineLevel;

    private LocalDateTime timestamp;

    public WaterQualityData() {
    }

    public WaterQualityData(Long id, Device device, double pH, double turbidity, double temperature, double tds, double chlorineLevel, LocalDateTime timestamp) {
        this.id = id;
        this.device = device;
        this.pH = pH;
        this.turbidity = turbidity;
        this.temperature = temperature;
        this.tds = tds;
        this.chlorineLevel = chlorineLevel;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
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

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
