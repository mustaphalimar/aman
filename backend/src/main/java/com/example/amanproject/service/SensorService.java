package com.example.amanproject.service;

import com.example.amanproject.model.Sensor;
import com.example.amanproject.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {

    @Autowired
    SensorRepository sensorRepository;
    public List<Sensor> getAvailableSensors() {
        return sensorRepository.findAll();
    }


    public Sensor createSensor(Sensor sensor) {
        return sensorRepository.save(sensor);
    }


    public Sensor updateSensor(Long id, Sensor updatedSensor) {
        Sensor existing = sensorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor not found"));
        existing.setSensorName(updatedSensor.getSensorName());
        existing.setPrice(updatedSensor.getPrice());
        return sensorRepository.save(existing);
    }


    public void deleteSensor(Long id) {
        if (!sensorRepository.existsById(id)) {
            throw new RuntimeException("Sensor not found");
        }
        sensorRepository.deleteById(id);
    }

}
