package com.example.amanproject.service;

import com.example.amanproject.dto.requests.CustomerRegistrationRequest;
import com.example.amanproject.dto.requests.CustomerRegistrationResponse;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.*;
import com.example.amanproject.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CustomerRegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomerRegistrationResponse registerCustomer(CustomerRegistrationRequest request) {
        try {
            // Step 1: Create and save the customer/user
            User customer = createCustomer(request);

            // Step 2: Get selected sensors
            List<Sensor> selectedSensors = getSensorsByIds(request.getSelectedSensorIds());

            // Step 3: Create and assign device with selected sensors
            Device device = createDeviceWithSensors(customer, request, selectedSensors);

            // Step 4: Calculate total amount based on selected sensors
            BigDecimal totalAmount = device.calculateTotalPrice();

            // Step 6: Create payment
            Payment payment = createPayment(customer, device, totalAmount);

            return new CustomerRegistrationResponse(
                    customer.getId(),
                    device.getId(),
                    device.getQrCode(),
                    totalAmount,
                    payment.getId(),
                    "Customer registered successfully!"
            );

        } catch (Exception e) {
            throw new RuntimeException("Registration failed: " + e.getMessage(), e);
        }
    }

    private User createCustomer(CustomerRegistrationRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User with email already exists");
        }

        User customer = new User();
        customer.setFirst_name(request.getFirstName());
        customer.setLast_name(request.getLastName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));

        // Set customer role
        Role customerRole = roleRepository.findByName("CUSTOMER")
                .orElseThrow(() -> new RuntimeException("Customer role not found"));
        customer.setRole(customerRole);

        return userRepository.save(customer);
    }

    private List<Sensor> getSensorsByIds(List<Long> sensorIds) {
        if (sensorIds == null || sensorIds.isEmpty()) {
            throw new RuntimeException("At least one sensor must be selected");
        }

        List<Sensor> sensors = sensorRepository.findAllById(sensorIds);
        if (sensors.size() != sensorIds.size()) {
            throw new RuntimeException("Some selected sensors were not found");
        }

        return sensors;
    }

    private Device createDeviceWithSensors(User customer, CustomerRegistrationRequest request,
                                           List<Sensor> selectedSensors) {
        Device device = new Device(
                customer,
                request.getDeviceName(),
                request.getDeviceType(),
                selectedSensors
        );

        return deviceRepository.save(device);
    }



    private Payment createPayment(User customer, Device device, BigDecimal amount) {
        Payment payment = new Payment();
        payment.setUser(customer);
        payment.setDevice(device); // Associate with the device instead of a subscription
        payment.setAmount(amount);
        payment.setStatus(PaymentStatus.COMPLETED); // Mark as paid directly

        return paymentRepository.save(payment);
    }

    // Method to get available sensors for selection
    public List<Sensor> getAvailableSensors() {
        return sensorRepository.findAll();
    }


}
