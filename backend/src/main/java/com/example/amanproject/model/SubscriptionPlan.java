package com.example.amanproject.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "SubscriptionPlan")
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private int duration; // in months

    @Column(nullable = false, columnDefinition = "TEXT")
    private String features;

    // Getters & Setters
}

