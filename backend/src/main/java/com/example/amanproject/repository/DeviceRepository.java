package com.example.amanproject.repository;

import com.example.amanproject.model.Device;
import com.example.amanproject.enums.DeviceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {


    @Query("SELECT d FROM Device d " +
            "JOIN FETCH d.sensors " +
            "WHERE d.user.id = :userId")
    List<Device> findDevicesWithSensorsByUserId(@Param("userId") Long userId);

    @Query("SELECT d FROM Device d " +
            "LEFT JOIN FETCH d.sensors " +
            "WHERE d.id = :deviceId")
    Optional<Device> findByIdWithSensors(@Param("deviceId") Long deviceId);

    long countByStatus(DeviceStatus status);

    @Query("SELECT COUNT(d) FROM Device d WHERE d.status = :status")
    long customCountByStatus(@Param("status") DeviceStatus status);

    List<Device> findByUserId(Long userId);
    Optional<Device> findById(Long id);

}

