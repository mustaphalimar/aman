package com.example.amanproject.dto;

import com.example.amanproject.model.Device;
import com.example.amanproject.model.Payment;
import com.example.amanproject.model.User;

import java.util.List;

public class CustomerListDto {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private DeviceSimpleDto device;
    private List<PaymentDto> payments;

    public CustomerListDto(User user, Device device, List<Payment> payments) {
        this.userId = user.getId();
        this.firstName = user.getFirst_name();
        this.lastName = user.getLast_name();
        this.email = user.getEmail();
        this.device = device != null ? new DeviceSimpleDto(device.getId(), device.getDeviceName(), device.getDeviceType()) : null;

        this.payments = payments.stream().map(PaymentDto::new).toList();
    }

    public CustomerListDto() {
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

    public DeviceSimpleDto getDevice() {
        return device;
    }

    public void setDevice(DeviceSimpleDto device) {
        this.device = device;
    }

    public List<PaymentDto> getPayments() {
        return payments;
    }

    public void setPayments(List<PaymentDto> payments) {
        this.payments = payments;
    }
}
