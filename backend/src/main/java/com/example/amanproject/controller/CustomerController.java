package com.example.amanproject.controller;

import com.example.amanproject.dto.CustomerOverviewDTO;
import com.example.amanproject.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


// Hello
    @GetMapping("/overview")
    public ResponseEntity<List<CustomerOverviewDTO>> getOverview() {
        List<CustomerOverviewDTO> customers = customerService.getCustomerOverview();
        return ResponseEntity.ok(customers);
    }
}

