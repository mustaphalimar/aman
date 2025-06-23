package com.example.amanproject.dto;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;


public class RecentSaleDTO {
    private String customerName;
    private BigDecimal amount;
    private LocalDateTime paymentDate;


    public RecentSaleDTO() {}

    public RecentSaleDTO(String customerName, BigDecimal amount, LocalDateTime paymentDate) {
        this.customerName = customerName;
        this.amount = amount;
        this.paymentDate = paymentDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
