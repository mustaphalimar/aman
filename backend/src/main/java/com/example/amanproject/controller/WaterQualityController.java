package com.example.amanproject.controller;


import com.example.amanproject.dto.WaterQualityDataDto;
import com.example.amanproject.service.WaterQualityDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/waterquality")
@RequiredArgsConstructor
//@PreAuthorize("hasRole('DEVICE')")
public class WaterQualityController {

    @Autowired
    private WaterQualityDataService waterQualityDataService;

    @PostMapping("/send/{deviceId}")
    public ResponseEntity<?> sendData(@PathVariable Long deviceId, @RequestBody WaterQualityDataDto dto) {

        if (dto == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Request body is missing or invalid"));
        }

        try {
            waterQualityDataService.saveSensorData(deviceId, dto);
            return ResponseEntity.ok(Map.of("message","Sensor data saved successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }


}
