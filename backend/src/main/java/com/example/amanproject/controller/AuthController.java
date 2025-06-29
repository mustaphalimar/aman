package com.example.amanproject.controller;

import com.example.amanproject.dto.requests.CustomerRegistrationRequest;
import com.example.amanproject.dto.requests.CustomerRegistrationResponse;
import com.example.amanproject.security.JwtUtil;
import com.example.amanproject.service.AuthService;
import com.example.amanproject.service.CustomerRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @Autowired
    private CustomerRegistrationService registrationService;

    public AuthController(JwtUtil jwtUtil, AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }



    @PostMapping("/register")
    public ResponseEntity<CustomerRegistrationResponse> registerCustomer(
            /* @Valid */
            @RequestBody CustomerRegistrationRequest request) {
        try {
            CustomerRegistrationResponse response = registrationService.registerCustomer(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new CustomerRegistrationResponse(null, null, null, null, null, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CustomerRegistrationResponse(null, null, null, null, null,
                            "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");
            System.out.println("login info : " + email + " | " + password);
            String token = authService.login(email, password);

            String role = jwtUtil.extractRole(token);

            String message = switch (role) {
                case "ADMIN" -> "Welcome back Admin!";
                case "CUSTOMER" -> "Welcome valued customer!";
                default -> "Login successful";
            };

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "status", "success",
                    "role", role,
                    "message", message));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()));
        }

        /*
         * try {
         * String token = authService.login(loginRequest.get("username"),
         * loginRequest.get("password"));
         * return ResponseEntity.ok(Map.of(
         * "token", token,
         * "status", "success",
         * "message", "Login successful"
         * ));
         * } catch (Exception e) {
         * return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
         * "status", "error",
         * "message", e.getMessage()
         * ));
         * }
         */
    }
}
