package com.example.amanproject.service;

import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.Device;
import com.example.amanproject.model.Payment;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Service
public class PaymentService {

    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private PaymentRepository paymentRepository;


    public Payment createPayment(Long deviceId, BigDecimal amount, PaymentStatus status) {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device not found"));

        Payment payment = new Payment();
        payment.setDevice(device);
        payment.setUser(device.getUser());
        payment.setAmount(amount);
        payment.setStatus(status);
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }


    public Payment updatePaymentStatus(Long paymentId, PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

}
