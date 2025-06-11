package com.example.amanproject.dto;

import lombok.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;


public class RecentSaleDTO {
    private String customerName;
    private BigDecimal amount;
    private Timestamp paymentDate;


    public RecentSaleDTO() {}

    public RecentSaleDTO(String customerName, BigDecimal amount, Timestamp paymentDate) {
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

    public Timestamp getPaymentDate() {
        return paymentDate;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setPaymentDate(Timestamp paymentDate) {
        this.paymentDate = paymentDate;
    }
}
