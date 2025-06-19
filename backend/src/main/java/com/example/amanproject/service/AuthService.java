package com.example.amanproject.service;

import com.example.amanproject.model.User;
import com.example.amanproject.repository.UserRepository;
import com.example.amanproject.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserDetailsService userDetailsService;


    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

   /* public String login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent() && passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return jwtUtil.generateToken(username);
        }
        throw new RuntimeException("Invalid credentials");
    }*/

    public String login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String storedPassword = user.getPassword();

            // First try with BCrypt encoder
            if (passwordEncoder.matches(password, storedPassword)) {
                //  Here we check if the user is ADMIN
                /*if (!"ADMIN".equals(user.getRole().getName())) {
                    throw new RuntimeException("Access denied: You are not authorized to access this system");
                }*/

                return jwtUtil.generateToken(email, user.getRole().getName());
                //return user.getRole().getName();

            }

            // If that fails, check for plain text password match
            if (password.equals(storedPassword)) {
                // Update the password to be BCrypt encoded for next time
                user.setPassword(passwordEncoder.encode(password));
                userRepository.save(user);
                return jwtUtil.generateToken(email, user.getRole().getName());

            }
        }

        throw new RuntimeException("Invalid credentials");
    }
}

