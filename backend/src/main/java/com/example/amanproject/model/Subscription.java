package com.example.amanproject.model;

import com.example.amanproject.enums.SubscriptionStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "Subscription")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "plan_id", nullable = false)
    private SubscriptionPlan plan;

    @CreationTimestamp
    private Timestamp startDate;

    private Timestamp endDate;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status; // ACTIVE, EXPIRED, CANCELED

    // Getters & Setters
}
