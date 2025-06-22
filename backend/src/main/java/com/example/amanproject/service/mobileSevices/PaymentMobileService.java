package com.example.amanproject.service.mobileSevices;

import com.example.amanproject.model.Payment;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.mobileRepos.PaymentMobileRepository;
import com.example.amanproject.repository.mobileRepos.UserMobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentMobileService {

    @Autowired
    private PaymentMobileRepository paymentRepository;
    @Autowired
    private UserMobileRepository userMobileRepository;


    public Map<String, Object> getPaymentsForAuthenticatedUser(Authentication authentication) {
        String email = authentication.getName();

        User user = userMobileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Payment> payments = paymentRepository.findByUserId(user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("payments", payments);
        response.put("count", payments.size());
        return response;
    }

}
