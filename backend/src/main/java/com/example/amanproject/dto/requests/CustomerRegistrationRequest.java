package com.example.amanproject.dto.requests;

import java.util.List;

public class CustomerRegistrationRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private String deviceName;
    private String deviceType;
    private List<Long> selectedSensorIds;


    public CustomerRegistrationRequest() {}

    public CustomerRegistrationRequest(String firstName, String lastName, String email,
                                       String phone, String password, String deviceName,
                                       String deviceType, List<Long> selectedSensorIds) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.deviceName = deviceName;
        this.deviceType = deviceType;
        this.selectedSensorIds = selectedSensorIds;
    }

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getDeviceName() { return deviceName; }
    public void setDeviceName(String deviceName) { this.deviceName = deviceName; }

    public String getDeviceType() { return deviceType; }
    public void setDeviceType(String deviceType) { this.deviceType = deviceType; }

    public List<Long> getSelectedSensorIds() { return selectedSensorIds; }
    public void setSelectedSensorIds(List<Long> selectedSensorIds) { this.selectedSensorIds = selectedSensorIds; }

}
