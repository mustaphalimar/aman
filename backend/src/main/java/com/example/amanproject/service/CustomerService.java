package com.example.amanproject.service;


import com.example.amanproject.dto.CustomerCreationDTO;
import com.example.amanproject.dto.CustomerDTO;
import com.example.amanproject.dto.CustomerOverviewDTO;
import com.example.amanproject.dto.CustomerUpdateDTO;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.Device;
import com.example.amanproject.model.Role;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.RoleRepository;
import com.example.amanproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    public CustomerService(UserRepository userRepository,
                           RoleRepository roleRepository,
                           DeviceRepository deviceRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.deviceRepository = deviceRepository;
    }

    public List<CustomerDTO> getCustomerOverview() {
        Role customerRole = roleRepository.findByName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Role CUSTOMER not found"));

        return userRepository.fetchCustomerOverview(PaymentStatus.COMPLETED, customerRole);
    }


    public void createCustomer(CustomerCreationDTO dto) {
        Role customerRole = roleRepository.findByName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Role CUSTOMER not found"));

        User user = new User();
        user.setFirst_name(dto.getFirstName());
        user.setLast_name(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // consider encoding
        user.setRole(customerRole);

        // Assign devices (optional)
        if (dto.getDeviceIds() != null && !dto.getDeviceIds().isEmpty()) {
            List<Device> devices = deviceRepository.findAllById(dto.getDeviceIds());
            for (Device device : devices) {
                device.setUser(user);
            }
            user.setDevices(devices);
        }

        userRepository.save(user);
    }


    public void updateCustomer(Long id, CustomerUpdateDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        user.setFirst_name(dto.getFirstName());
        user.setLast_name(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(dto.getPassword()); // hash it if needed
        }

        if (dto.getDeviceIds() != null) {
            List<Device> devices = deviceRepository.findAllById(dto.getDeviceIds());
            user.setDevices(devices);
        }

        userRepository.save(user);
    }


    public void deleteCustomer(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Customer not found with id: " + id);
        }

        userRepository.deleteById(id);
    }




}


