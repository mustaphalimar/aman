package com.example.amanproject.dto.customer;

import com.example.amanproject.dto.device.DeviceWithSensorsAndQualityDto;
import com.example.amanproject.model.Payment;
import com.example.amanproject.model.User;

import java.sql.Timestamp;
import java.util.List;

public class CustomerDetailDTO {


    private Long userId;
    private String firstName;
    private String lastName;
    private String email;

    private String phone;
    private Timestamp createdAt;
    private DeviceWithSensorsAndQualityDto device;
    private List<Payment> payments;

    public CustomerDetailDTO() {
    }

    public CustomerDetailDTO(User user, DeviceWithSensorsAndQualityDto device, List<Payment> payments) {
        this.userId = user.getId();
        this.firstName = user.getFirst_name();
        this.lastName = user.getLast_name();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.createdAt = user.getCreatedAt();
        this.device = device;
        this.payments = payments;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public DeviceWithSensorsAndQualityDto getDevice() {
        return device;
    }

    public void setDevice(DeviceWithSensorsAndQualityDto device) {
        this.device = device;
    }

    public List<Payment> getPayments() {
        return payments;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }
}
