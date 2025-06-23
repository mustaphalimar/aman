package com.example.amanproject.controller;

import com.example.amanproject.dto.*;
import com.example.amanproject.dto.requests.UpdateCustomerDTO;
import com.example.amanproject.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;





    @GetMapping
    public ResponseEntity<List<CustomerListDto>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDetailDTO> getCustomerDetails(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.getCustomerDetails(id));
    }

    /*

    @GetMapping("/overview")
    public ResponseEntity<List<CustomerOverviewDTO>> getCustomersOverview() {
        List<CustomerOverviewDTO> customers = customerService.getCustomerOverview();
        return ResponseEntity.ok(customers);
    }


    @GetMapping
    public ResponseEntity<List<CustomerOverviewDTO>> getAllCustomers() {
        List<CustomerOverviewDTO> customers = customerService.getCustomerOverview();
        return ResponseEntity.ok(customers);
    }

    // Get single customer by ID with full details (including device and sensors)
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDetailDTO> getCustomerById(@PathVariable Long id) {
        CustomerDetailDTO customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }
    */
    /*
    // Create new customer
    @PostMapping
    public ResponseEntity<CustomerDetailDTO> createCustomer( @RequestBody CreateCustomerDTO createCustomerDTO) {
        CustomerDetailDTO createdCustomer = customerService.createCustomer(createCustomerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }*/




    /*
    // Update existing customer
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDetailDTO> updateCustomer(@PathVariable Long id,
                                                             @RequestBody UpdateCustomerDTO updateCustomerDTO) {
        CustomerDetailDTO updatedCustomer = customerService.updateCustomer(id, updateCustomerDTO);
        return ResponseEntity.ok(updatedCustomer);
    }

    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
    */

}

