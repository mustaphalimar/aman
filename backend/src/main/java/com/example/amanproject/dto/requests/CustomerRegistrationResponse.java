package com.example.amanproject.dto.requests;

import java.math.BigDecimal;

public class CustomerRegistrationResponse {

    private Long userId;
    private Long deviceId;
    private String qrCode;
    private BigDecimal totalAmount;
    private Long paymentId;
    private String message;


    public CustomerRegistrationResponse() {}

    public CustomerRegistrationResponse(Long userId, Long deviceId, String qrCode,
                                        BigDecimal totalAmount, Long paymentId, String message) {
        this.userId = userId;
        this.deviceId = deviceId;
        this.qrCode = qrCode;
        this.totalAmount = totalAmount;
        this.paymentId = paymentId;
        this.message = message;
    }

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getDeviceId() { return deviceId; }
    public void setDeviceId(Long deviceId) { this.deviceId = deviceId; }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

}
