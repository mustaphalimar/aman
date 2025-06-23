package com.example.amanproject.service;


import com.example.amanproject.dto.*;
import com.example.amanproject.dto.requests.UpdateCustomerDTO;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.model.*;
import com.example.amanproject.repository.PaymentRepository;
import com.example.amanproject.repository.RoleRepository;
import com.example.amanproject.repository.UserRepository;
import com.example.amanproject.repository.WaterQualityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private WaterQualityDataRepository waterQualityDataRepository;



    public List<CustomerListDto> getAllCustomers() {
        return userRepository.findAll().stream().map(user -> {
            Device device = user.getDevices().isEmpty() ? null : user.getDevices().get(0);
            List<Payment> payments = paymentRepository.findByUser_Id(user.getId());

            return new CustomerListDto(user, device, payments);
        }).toList();
    }
    public CustomerDetailDTO getCustomerDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Device device = user.getDevices().isEmpty() ? null : user.getDevices().get(0);
        List<Payment> payments = paymentRepository.findByUser_Id(userId);

        DeviceWithSensorsAndQualityDto deviceDto = null;

        /*if (device != null) {
            List<String> sensorNames = device.getSensors().stream()
                    .map(Sensor::getSensorName).toList(); */
        if (device != null) {
        List<Sensor> sensors = device.getSensors();


            Optional<WaterQualityData> latestData = waterQualityDataRepository
                    .findTop1ByDeviceIdOrderByTimestampDesc(device.getId());

            WaterQualityStatusDto statusDto = latestData.map(data ->
                    new WaterQualityStatusDto(
                            data.getpH(),
                            data.getTurbidity(),
                            data.getTemperature(),
                            data.getTds(),
                            data.getChlorineLevel(),
                            evaluateWaterQuality(data)
                    )
            ).orElse(null);

            deviceDto = new DeviceWithSensorsAndQualityDto(
                    device.getId(),
                    device.getDeviceName(),
                    device.getDeviceType(),
                    sensors,
                    statusDto
            );
        }

        return new CustomerDetailDTO(user, deviceDto, payments);
    }



    private String evaluateWaterQuality(WaterQualityData data) {
        if (data.getpH() < 6.5 || data.getpH() > 8.5 || data.getTurbidity() > 5) {
            return "DANGEROUS";
        } else if (data.getpH() < 7.0 || data.getpH() > 8.0) {
            return "WARNING";
        }
        return "GOOD";
    }



    /*
    public List<CustomerOverviewDTO> getCustomerOverview() {
        List<User> customers = userRepository.findAllCustomersWithDeviceAndSensors();
        return customers.stream()
                .map(this::convertToOverviewDTO)
                .collect(Collectors.toList());
    }

    public CustomerDetailDTO getCustomerById(Long id) {
        User customer = userRepository.findByIdWithDeviceAndSensors(id)
                .orElseThrow(() -> new  RuntimeException("Customer not found with id: " + id));

        return convertToDetailDTO(customer);
    }



    public CustomerDetailDTO updateCustomer(Long id, UpdateCustomerDTO updateCustomerDTO) {
        User customer = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        // Check if email is being changed and if new email already exists
        if (!customer.getEmail().equals(updateCustomerDTO.getEmail()) &&
                userRepository.existsByEmail(updateCustomerDTO.getEmail())) {
            throw new RuntimeException("Customer with email " + updateCustomerDTO.getEmail() + " already exists");
        }

        // Update customer fields
        customer.setFirst_name(updateCustomerDTO.getFirstName());
        customer.setLast_name(updateCustomerDTO.getLastName());
        customer.setEmail(updateCustomerDTO.getEmail());
        customer.setPhone(updateCustomerDTO.getPhone());

        // Update role if provided
        if (updateCustomerDTO.getRoleId() != null) {
            Role role = roleRepository.findById(updateCustomerDTO.getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found with id: " + updateCustomerDTO.getRoleId()));
            customer.setRole(role);
        }

        User updatedCustomer = userRepository.save(customer);
        return convertToDetailDTO(updatedCustomer);
    }

    public void deleteCustomer(Long id) {
        User customer = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        userRepository.delete(customer);
    }

    public DeviceDetailDTO getCustomerDevice(Long customerId) {
        User customer = userRepository.findByIdWithDeviceAndSensors(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + customerId));

        // Get the single device (first one if exists)
        Device device = customer.getDevices().stream()
                .findFirst()
                .orElse(null);

        return device != null ? convertToDeviceDetailDTO(device) : null;
    }

    // Helper methods for DTO conversion
    private CustomerOverviewDTO convertToOverviewDTO(User user) {
        String deviceName = null;
        String deviceType = null;
        String deviceStatus = null;
        int sensorCount = 0;

        // Get the single device if exists
        if (!user.getDevices().isEmpty()) {
            Device device = user.getDevices().get(0); // Get first (and should be only) device
            deviceName = device.getDeviceName();
            deviceType = device.getDeviceType();
            deviceStatus = device.getStatus().toString();
            sensorCount = device.getSensors().size();
        }

        return new CustomerOverviewDTO(
                user.getId(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().getName(),
                user.getCreatedAt(),
                deviceName,
                deviceType,
                deviceStatus,
                sensorCount
        );
    }

    private CustomerDetailDTO convertToDetailDTO(User user) {
        DeviceDetailDTO deviceDTO = null;

        // Get the single device if exists
        if (!user.getDevices().isEmpty()) {
            deviceDTO = convertToDeviceDetailDTO(user.getDevices().get(0));
        }

        return new CustomerDetailDTO(
                user.getId(),
                user.getFirst_name(),
                user.getLast_name(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().getName(),
                user.getCreatedAt(),
                deviceDTO
        );
    }

    private DeviceDetailDTO convertToDeviceDetailDTO(Device device) {
        List<SensorDTO> sensorDTOs = device.getSensors().stream()
                .map(this::convertToSensorDTO)
                .collect(Collectors.toList());

        return new DeviceDetailDTO(
                device.getId(),
                device.getDeviceName(),
                device.getDeviceType(),
                device.getQrCode(),
                device.getStatus().toString(),
                device.getCreatedAt(),
                sensorDTOs
        );
    }

    private SensorDTO convertToSensorDTO(Sensor sensor) {
        return new SensorDTO(
                sensor.getId(),
                sensor.getSensorName(),
                sensor.getDescription(),
                sensor.getPrice(),
                sensor.getCreatedAt()
        );
    }*/

}


