package com.example.amanproject.controller.ApiController;


import com.example.amanproject.service.mobileSevices.PaymentMobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mobile/payments")
public class PaymentConrollerMobile {
    @Autowired

    private PaymentMobileService paymentMobileService;


    @GetMapping("/my")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getMyPayments(Authentication authentication) {
        return ResponseEntity.ok(paymentMobileService.getPaymentsForAuthenticatedUser(authentication));
    }


}
