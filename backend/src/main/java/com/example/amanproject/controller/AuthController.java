package com.example.amanproject.controller;

import com.example.amanproject.security.JwtUtil;
import com.example.amanproject.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    public AuthController(JwtUtil jwtUtil, AuthService authService) {
        this.jwtUtil = jwtUtil;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {


        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");
            String token = authService.login(username, password);

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
                    "message", message
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }

        /*try {
            String token = authService.login(loginRequest.get("username"), loginRequest.get("password"));
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "status", "success",
                    "message", "Login successful"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }*/
    }
}

