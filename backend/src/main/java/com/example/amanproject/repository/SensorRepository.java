package com.example.amanproject.repository;

import com.example.amanproject.model.Payment;
import com.example.amanproject.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long> {
   // List<Sensor> findAll();
}
