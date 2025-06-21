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



}
