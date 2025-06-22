package com.example.amanproject.controller;


import com.example.amanproject.dto.DeviceDTO;
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

