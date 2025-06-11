package com.example.amanproject.model;

import jakarta.persistence.*;

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
}
