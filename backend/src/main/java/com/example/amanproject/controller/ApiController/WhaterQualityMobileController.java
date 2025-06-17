package com.example.amanproject.controller.ApiController;

import com.example.amanproject.dto.WaterQualityStatusDto;
import com.example.amanproject.service.WaterQualityDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/whaterquality")
@PreAuthorize("hasRole('CUSTOMER')")
public class WhaterQualityMobileController {



    @Autowired
    private WaterQualityDataService waterQualityDataService;
    @GetMapping("/status/{deviceId}")
    public ResponseEntity<?> getDeviceWaterStatus(@PathVariable Long deviceId) {
        try {
            WaterQualityStatusDto status = waterQualityDataService.getLatestDataAndStatus(deviceId);
            return ResponseEntity.ok(status);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
