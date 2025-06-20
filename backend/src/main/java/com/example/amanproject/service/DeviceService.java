package com.example.amanproject.service;

import com.example.amanproject.dto.DeviceDTO;
import com.example.amanproject.model.Device;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserRepository userRepository;

    public DeviceDTO createDevice(DeviceDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Device device = new Device();
        device.setUser(user);
        device.setDeviceName(dto.getDeviceName());
        device.setDeviceType(dto.getDeviceType());
        device.setQrCode(dto.getQrCode());
        device.setStatus(dto.getStatus());

        return toDTO(deviceRepository.save(device));
    }

    public List<DeviceDTO> getAllDevices() {
        return deviceRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DeviceDTO getDeviceById(Long id) {
        return deviceRepository.findById(id).map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Device not found"));
    }

    public DeviceDTO updateDevice(Long id, DeviceDTO dto) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found"));

        device.setDeviceName(dto.getDeviceName());
        device.setDeviceType(dto.getDeviceType());
        device.setQrCode(dto.getQrCode());
        device.setStatus(dto.getStatus());

        return toDTO(deviceRepository.save(device));
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    private DeviceDTO toDTO(Device device) {
        DeviceDTO dto = new DeviceDTO();
        dto.setUserId(device.getId());
        dto.setUserId(device.getUser().getId());
        dto.setDeviceName(device.getDeviceName());
        dto.setDeviceType(device.getDeviceType());
        dto.setQrCode(device.getQrCode());
        dto.setStatus(device.getStatus());
        return dto;
    }
}
