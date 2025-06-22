package com.example.amanproject.service;

import com.example.amanproject.dto.CustomerOverviewDTO;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.enums.Role;
import com.example.amanproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final UserRepository userRepository;

    @Autowired
    public CustomerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<CustomerOverviewDTO> getCustomerOverview() {
        return userRepository.fetchCustomerOverview(
                PaymentStatus.COMPLETED,
                Role.CUSTOMER);
    }
}
