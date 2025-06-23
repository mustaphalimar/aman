package com.example.amanproject.service.mobileSevices;


import com.example.amanproject.dto.whaterquality.WaterQualityStatusDto;
import com.example.amanproject.model.WaterQualityData;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.WaterQualityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class WaterQualityDataServiceMobile {

    @Autowired
    private WaterQualityDataRepository waterQualityDataRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    public WaterQualityStatusDto getLatestDataAndStatus(Long deviceId) {
        WaterQualityData data = waterQualityDataRepository.findTop1ByDeviceIdOrderByTimestampDesc(deviceId)
                .orElseThrow(() -> new RuntimeException("No data found"));

        String status = evaluateWaterQuality(data);

        return new WaterQualityStatusDto(
                data.getpH(),
                data.getTurbidity(),
                data.getTemperature(),
                data.getTds(),
                data.getChlorineLevel(),
                status
        );
    }


    public String evaluateWaterQuality(WaterQualityData data) {
        int dangerCount = 0;
        int warningCount = 0;

        double pH = data.getpH();
        double turbidity = data.getTurbidity();
        double temp = data.getTemperature();
        double tds = data.getTds();
        double chlorine = data.getChlorineLevel();

        // pH
        if (pH < 6.0 || pH > 9.0) dangerCount++;
        else if ((pH >= 6.0 && pH < 6.5) || (pH > 8.5 && pH <= 9.0)) warningCount++;

        // Turbidity
        if (turbidity > 10) dangerCount++;
        else if (turbidity > 5 && turbidity <= 10) warningCount++;

        // Temperature
        if (temp < 5 || temp > 35) dangerCount++;
        else if (temp >= 26 && temp <= 35) warningCount++;

        // TDS
        if (tds > 1000) dangerCount++;
        else if (tds > 500 && tds <= 1000) warningCount++;

        // Chlorine
        if (chlorine < 0.1  || chlorine > 1.5) dangerCount++;
        else if ((chlorine >= 0.1 && chlorine < 0.2) || (chlorine > 1 && chlorine <= 1.5)) warningCount++;

        if (dangerCount > 0) return "danger";
        else if (warningCount > 0) return "warning";
        else return "normal";
    }

/*
    public WaterQualityData saveSensorData(Long deviceId, WaterQualityDataDto dto) {
        Device device = deviceRepository.findById(deviceId)
                .orElseThrow(() -> new RuntimeException("Device not found"));

        WaterQualityData data = new WaterQualityData();
        data.setDevice(device);
        data.setpH(dto.getpH());
        data.setTds(dto.getTds());
        data.setTurbidity(dto.getTurbidity());
        data.setTemperature(dto.getTemperature());
        data.setChlorineLevel(dto.getChlorineLevel());
        data.setTimestamp(LocalDateTime.now());

        return waterQualityDataRepository.save(data);
    }


    public WaterQualityData getLatestData(Long deviceId) {
        return waterQualityDataRepository.findTop1ByDeviceIdOrderByTimestampDesc(deviceId)
                .stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No data available for this device"));
    }



    public WaterQualityStatusDto getLatestDataAndStatus(Long deviceId) {
        WaterQualityData data = waterQualityDataRepository.findTop1ByDeviceIdOrderByTimestampDesc(deviceId)
                .orElseThrow(() -> new RuntimeException("No data found"));

        String status = evaluateWaterQuality(data);

        return new WaterQualityStatusDto(
                data.getpH(),
                data.getTurbidity(),
                data.getTemperature(),
                data.getTds(),
                data.getChlorineLevel(),
                status
        );
    }

*/


    public List<Map<String, Object>> getSensorCurves(Long deviceId, LocalDate date) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        List<Object[]> results = waterQualityDataRepository.findHourlyAveragesForDay(deviceId, start, end);

        List<Map<String, Object>> curves = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("hour", row[0]);
            map.put("pH", row[1]);
            map.put("turbidity", row[2]);
            map.put("temperature", row[3]);
            map.put("tds", row[4]);
            map.put("chlorineLevel", row[5]);
            curves.add(map);
        }

        return curves;
    }



    public Map<String, Object> getRawData(LocalDate date, Long deviceId) {
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        Object raw = waterQualityDataRepository.findRawDailyAveragesBetween(deviceId, start, end)
                .orElseThrow(() -> new RuntimeException("No data for that day"));

        Object[] result = (Object[]) raw;

        System.out.println("Raw: " + raw);
        System.out.println("Class: " + raw.getClass().getName());

        // Juste pour test d'affichage ou debug
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("pH", result[0]);
        map.put("turbidity", result[1]);
        map.put("temperature", result[2]);
        map.put("tds", result[3]);
        map.put("chlorineLevel", result[4]);
        map.put("date", date);


        System.out.println("Avg pH: " + map.get("pH"));
        System.out.println("Avg turbidity: " + map.get("turbidity"));
        System.out.println("Avg temperature: " + map.get("temperature"));
        System.out.println("Avg TDS: " + map.get("tds"));
        System.out.println("Avg chlorine: " + map.get("chlorineLevel"));
        System.out.println("Date: " + map.get("date"));

        return map;
    }


/*
    public String evaluateWaterQuality(WaterQualityData entity) {
        return evaluateWaterQuality(
                entity.getpH(),
                entity.getTurbidity(),
                entity.getTemperature(),
                entity.getTds(),
                entity.getChlorineLevel()
        );
    }

    public String evaluateWaterQuality(WaterQualityStatusDto dto) {
        return evaluateWaterQuality(
                dto.getpH(),
                dto.getTurbidity(),
                dto.getTemperature(),
                dto.getTds(),
                dto.getChlorineLevel()
        );
    }


    private String evaluateWaterQuality(double pH, double turbidity, double temp,
                                        double tds, double chlorine) {
        int dangerCount = 0;
        int warningCount = 0;

        // pH (6.5-8.5 is ideal)
        if (pH < 6.0 || pH > 9.0) dangerCount++;
        else if ((pH >= 6.0 && pH < 6.5) || (pH > 8.5 && pH <= 9.0)) warningCount++;

        // Turbidity (0-5 is ideal)
        if (turbidity > 10) dangerCount++;
        else if (turbidity > 5 && turbidity <= 10) warningCount++;

        // Temperature (5-25 is ideal)
        if (temp < 5 || temp > 35) dangerCount++;
        else if (temp >= 26 && temp <= 35) warningCount++;

        // TDS (0-500 is ideal)
        if (tds > 1000) dangerCount++;
        else if (tds > 500 && tds <= 1000) warningCount++;

        // Chlorine Level (0.5-3.0 is ideal)
        if (chlorine < 0.2 || chlorine > 5.0) dangerCount++;
        else if (chlorine < 0.5 || chlorine > 3.0) warningCount++;

        if (dangerCount > 0) return "danger";
        else if (warningCount > 0) return "warning";
        else return "normal";
    }
    */
}
