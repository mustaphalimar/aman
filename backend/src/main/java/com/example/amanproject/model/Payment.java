package com.example.amanproject.model;

import com.example.amanproject.enums.PaymentStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "Payment")



public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne

    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscription;

    @Column(nullable = false)
    private BigDecimal amount;

    @CreationTimestamp
    private Timestamp paymentDate;

    //@Enumerated(EnumType.STRING)
    //private PaymentMethod paymentMethod; // CREDIT_CARD, PAYPAL, BANK_TRANSFER

    @Enumerated(EnumType.STRING)
    private PaymentStatus status; // COMPLETED, FAILED, PENDING

    // Getters & Setters
    public User getUser() {
        return user;
    }

    public Long getId() {
        return id;
    }

    public Subscription getSubscription() {
        return subscription;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public PaymentStatus getStatus() {
        return status;
    }



}

