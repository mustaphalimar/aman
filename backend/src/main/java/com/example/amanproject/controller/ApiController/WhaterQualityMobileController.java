package com.example.amanproject.controller.ApiController;

import com.example.amanproject.dto.WaterQualityStatusDto;
import com.example.amanproject.dto.mobileDtos.HistoricalWaterQualityDto;
import com.example.amanproject.service.mobileSevices.WaterQualityDataService;
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


/*
    @GetMapping("/daily/{deviceId}")
    public ResponseEntity<?> getDailyData(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            Object[]  data = (Object[]) waterQualityDataService.getDailyRawData(deviceId, date);
            return ResponseEntity.ok(data);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }
*/

    @GetMapping("/daily/curve/{deviceId}")
    public ResponseEntity<?> getDailySensorCurves(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<Map<String, Object>> data = waterQualityDataService.getSensorCurves(deviceId, date);
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
            Map<String, Object> data = waterQualityDataService.getRawData(date, deviceId);
            return ResponseEntity.ok(data);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }


    /*
    @GetMapping("/range/{deviceId}")
    public ResponseEntity<?> getDateRangeData(
            @PathVariable Long deviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            List<HistoricalWaterQualityDto> data = waterQualityDataService.getDateRangeData(deviceId, startDate, endDate);
            return ResponseEntity.ok(data);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

     */
}
