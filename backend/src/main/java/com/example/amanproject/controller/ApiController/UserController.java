package com.example.amanproject.controller.ApiController;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mobile/user")
public class UserController {
    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Map<String, Object>> getCustomerProfile(Authentication authentication) {
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Welcome, CUSTOMER!");
        data.put("username", authentication.getName());
        return ResponseEntity.ok(data);
    }
}
