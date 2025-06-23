package com.example.amanproject.controller;


import com.example.amanproject.dto.device.DeviceDTO;
import com.example.amanproject.enums.DeviceStatus;
import com.example.amanproject.model.Device;
import com.example.amanproject.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;



    //change status of an device
    @PutMapping("/{id}/status")
    public ResponseEntity<Device> updateDeviceStatus(
            @PathVariable Long id,
            @RequestParam("status") DeviceStatus status
    ) {
        Device device = deviceService.updateDeviceStatus(id, status);
        return ResponseEntity.ok(device);
    }

    @GetMapping
    public ResponseEntity<List<DeviceDTO>> getAll() {
        return ResponseEntity.ok(deviceService.getAllDevices());
    }

    @PostMapping("/create")
    public ResponseEntity<DeviceDTO> create(@RequestBody DeviceDTO dto) {
        return ResponseEntity.ok(deviceService.createDevice(dto));
    }



    @GetMapping("/{id}")
    public ResponseEntity<DeviceDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(deviceService.getDeviceById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DeviceDTO> update(@PathVariable Long id, @RequestBody DeviceDTO dto) {
        return ResponseEntity.ok(deviceService.updateDevice(id, dto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        deviceService.deleteDevice(id);
        return ResponseEntity.ok("Device deleted successfully");
    }
}

