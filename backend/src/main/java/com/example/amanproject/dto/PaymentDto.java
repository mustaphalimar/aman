package com.example.amanproject.dto;

import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.Payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDto {
    private Long id;
    private BigDecimal amount;
    private PaymentStatus status;
    private LocalDateTime paymentDate;

    public PaymentDto(Payment payment) {
        this.id = payment.getId();
        this.amount = payment.getAmount();
        this.status = payment.getStatus();
        this.paymentDate = payment.getPaymentDate();
    }

    public PaymentDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
