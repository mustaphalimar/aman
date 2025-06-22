package com.example.amanproject.controller;


import com.example.amanproject.model.Sensor;
import com.example.amanproject.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/sensors")
public class SensorController {

    @Autowired
    SensorService sensorService;

    @GetMapping("/getall")
    public ResponseEntity<List<Sensor>> getAvailableSensors() {
        try {
            List<Sensor> sensors = sensorService.getAvailableSensors();
            return ResponseEntity.ok(sensors);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Sensor> createSensor(@RequestBody Sensor sensor) {
        return ResponseEntity.ok(sensorService.createSensor(sensor));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Sensor> updateSensor(@PathVariable Long id, @RequestBody Sensor updatedSensor) {
        return ResponseEntity.ok(sensorService.updateSensor(id, updatedSensor));
    }


    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
        return ResponseEntity.noContent().build();
    }

}
