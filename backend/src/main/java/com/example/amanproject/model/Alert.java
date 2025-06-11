package com.example.amanproject.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Device device;

    private String message;
    private boolean resolved = false;
    private LocalDateTime createdAt;
}
