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


// Hello there

    @Query(value = """
    SELECT 
        FLOOR(HOUR(w.timestamp) / 2.4) AS period,
        AVG(w.pH) AS avg_ph,
        AVG(w.turbidity) AS avg_turbidity,
        AVG(w.temperature) AS avg_temperature,
        AVG(w.tds) AS avg_tds,
        AVG(w.chlorine_level) AS avg_chlorine
    FROM water_quality_data w
    WHERE w.device_id = :deviceId
    AND w.timestamp BETWEEN :start AND :end
    GROUP BY period
    ORDER BY period
""", nativeQuery = true)
    List<Object[]> findHourlyAveragesForDay(
            @Param("deviceId") Long deviceId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("SELECT " +
            "AVG(w.pH), " +
            "AVG(w.turbidity), " +
            "AVG(w.temperature), " +
            "AVG(w.tds), " +
            "AVG(w.chlorineLevel) " +
            "FROM WaterQualityData w " +
            "WHERE w.device.id = :deviceId " +
            "AND w.timestamp >= :startOfDay " +
            "AND w.timestamp < :endOfDay")
    Optional<Object>  findRawDailyAveragesBetween(
            @Param("deviceId") Long deviceId,
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay);

    @Query("SELECT " +
            "AVG(w.pH), " +
            "AVG(w.turbidity), " +
            "AVG(w.temperature), " +
            "AVG(w.tds), " +
            "AVG(w.chlorineLevel), " +
            "FUNCTION('DATE', w.timestamp) " +
            "FROM WaterQualityData w " +
            "WHERE w.device.id = :deviceId " +
            "AND FUNCTION('DATE', w.timestamp) = :date " +
            "GROUP BY FUNCTION('DATE', w.timestamp)")
    Optional<Object[]> findRawDailyAverages(
            @Param("deviceId") Long deviceId,
            @Param("date") LocalDate date);

/*
    @Query("SELECT new com.example.amanproject.dto.HistoricalWaterQualityDto(" +
            "CAST(w.timestamp AS date), " +
            "AVG(w.pH), " +
            "AVG(w.turbidity), " +
            "AVG(w.temperature), " +
            "AVG(w.tds), " +
            "AVG(w.chlorineLevel), " +
            "'') " +  // Empty status initially
            "FROM WaterQualityData w " +
            "WHERE w.device.id = :deviceId " +
            "AND CAST(w.timestamp AS date) BETWEEN :startDate AND :endDate " +
            "GROUP BY CAST(w.timestamp AS date) " +
            "ORDER BY CAST(w.timestamp AS date) DESC")
    List<HistoricalWaterQualityDto> findDateRangeAverages(
            @Param("deviceId") Long deviceId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

    */

}
