package com.example.amanproject.controller;

import com.example.amanproject.dto.requests.PaymentRequestDto;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.Payment;
import com.example.amanproject.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/payments")
@PreAuthorize("hasRole('ADMIN')")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @PutMapping("/{id}/status")
    public ResponseEntity<?> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam("status") PaymentStatus status
    ) {
        try {
            Payment updated = paymentService.updatePaymentStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentRequestDto request) {
        Payment payment = paymentService.createPayment(
                request.getDeviceId(),
                request.getAmount(),
                request.getStatus()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }
}
