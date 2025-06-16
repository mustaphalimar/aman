package com.example.amanproject.repository;

import com.example.amanproject.model.Payment;
import com.example.amanproject.model.WaterQualityData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface WaterQualityDataRepository extends JpaRepository<WaterQualityData, Long> {
    Optional<WaterQualityData> findTop1ByDeviceIdOrderByTimestampDesc(Long deviceId);

}
