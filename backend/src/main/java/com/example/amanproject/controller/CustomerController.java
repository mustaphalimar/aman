package com.example.amanproject.controller;

import com.example.amanproject.dto.CustomerCreationDTO;
import com.example.amanproject.dto.CustomerDTO;
import com.example.amanproject.dto.CustomerOverviewDTO;
import com.example.amanproject.dto.CustomerUpdateDTO;
import com.example.amanproject.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// hello
@RestController
//@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/customers")
public class CustomerController {


    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }


// Hello
    @GetMapping("/overview")
    public ResponseEntity<List<CustomerDTO>> getOverview() {
        List<CustomerDTO> customers = customerService.getCustomerOverview();
        return ResponseEntity.ok(customers);
    }


    @PostMapping("/create")
    public ResponseEntity<String> createCustomer(@RequestBody CustomerCreationDTO dto) {
        customerService.createCustomer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Customer created successfully");
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable Long id, @RequestBody CustomerUpdateDTO dto) {
        customerService.updateCustomer(id, dto);
        return ResponseEntity.ok("Customer updated successfully");
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}

