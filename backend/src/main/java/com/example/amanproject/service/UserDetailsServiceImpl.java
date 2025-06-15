package com.example.amanproject.service;



import com.example.amanproject.model.User;
import com.example.amanproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        if (email == null || email.isEmpty() || user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Email or password cannot be null or empty");
        }



        return new org.springframework.security.core.userdetails.User(
                email,
                user.getPassword(),
                new ArrayList<>()
        );
    }
}

