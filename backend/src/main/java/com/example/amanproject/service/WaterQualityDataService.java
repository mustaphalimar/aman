package com.example.amanproject.service;


import com.example.amanproject.dto.WaterQualityDataDto;
import com.example.amanproject.dto.WaterQualityStatusDto;
import com.example.amanproject.model.Device;
import com.example.amanproject.model.WaterQualityData;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.WaterQualityDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class WaterQualityDataService {

    @Autowired
    private WaterQualityDataRepository waterQualityDataRepository;

    @Autowired
    private DeviceRepository deviceRepository;


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

    /*
    public String evaluateQuality(WaterQualityData data) {
        if (data.getpH() < 6 || data.getpH() > 8 ||
                data.getTds() > 50 ||
                data.getTurbidity() > 5) {
            return "Mauvaise";
        }
        return "Bonne";
    }*/


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
        if (chlorine < 0.1 || chlorine > 1.5) dangerCount++;
        else if ((chlorine >= 0.1 && chlorine < 0.2) || (chlorine > 1 && chlorine <= 1.5)) warningCount++;

        if (dangerCount > 0) return "danger";
        else if (warningCount > 0) return "warning";
        else return "normal";
    }

}
