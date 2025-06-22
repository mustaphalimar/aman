package com.example.amanproject.controller.ApiController;

import com.example.amanproject.dto.WaterQualityStatusDto;

import com.example.amanproject.service.mobileSevices.WaterQualityDataServiceMobile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mobile/whaterquality")
@PreAuthorize("hasRole('CUSTOMER')")
public class WhaterQualityMobileController {

    @Autowired
    private WaterQualityDataServiceMobile wterQualityDataServiceMobile;
    @GetMapping("/status/{deviceId}")
    public ResponseEntity<?> getDeviceWaterStatus(@PathVariable Long deviceId) {
        try {
            WaterQualityStatusDto status = wterQualityDataServiceMobile.getLatestDataAndStatus(deviceId);
            return ResponseEntity.ok(status);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }




    @GetMapping("/daily/curve/{deviceId}")
    public ResponseEntity<?> getDailySensorCurves(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<Map<String, Object>> data = wterQualityDataServiceMobile.getSensorCurves(deviceId, date);
            return ResponseEntity.ok(data);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/daily/raw/{deviceId}")
    public ResponseEntity<?> getRawDailyData(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            Map<String, Object> data = wterQualityDataServiceMobile.getRawData(date, deviceId);
            return ResponseEntity.ok(data);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
}
