package com.example.amanproject.dto.requests;

import com.example.amanproject.enums.PaymentStatus;

import java.math.BigDecimal;

public class PaymentRequestDto {
    private Long deviceId;
    private BigDecimal amount;
    private PaymentStatus status;

    public PaymentRequestDto(Long deviceId, BigDecimal amount, PaymentStatus status) {
        this.deviceId = deviceId;
        this.amount = amount;
        this.status = status;
    }

    public PaymentRequestDto() {
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
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
}
