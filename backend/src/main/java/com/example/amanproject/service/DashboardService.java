package com.example.amanproject.service;

import com.example.amanproject.dto.RecentSaleDTO;
import com.example.amanproject.enums.DeviceStatus;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.repository.DeviceRepository;
import com.example.amanproject.repository.PaymentRepository;
import com.example.amanproject.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final PaymentRepository paymentRepository;
    private final DeviceRepository deviceRepository;
    private final SubscriptionRepository subscriptionRepository;

    public DashboardService(PaymentRepository paymentRepository,
                            DeviceRepository deviceRepository,
                            SubscriptionRepository subscriptionRepository) {
        this.paymentRepository = paymentRepository;
        this.deviceRepository = deviceRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    public BigDecimal getTotalRevenue() {
        return paymentRepository.calculateTotalRevenueByStatus(PaymentStatus.COMPLETED);
    }

    public long getActiveDevices() {
        return deviceRepository.countByStatus(DeviceStatus.ACTIVE);
    }

    public long getTotalSales() {
        return paymentRepository.countPaymentsInDateRange(
                Timestamp.valueOf(LocalDate.now().withDayOfMonth(1).atStartOfDay()),
                Timestamp.valueOf(LocalDate.now().plusDays(1).atStartOfDay()),
                PaymentStatus.COMPLETED
        );
    }

    public long getTotalSubscriptions() {
        return subscriptionRepository.count();
    }



    public List<RecentSaleDTO> getRecentSales() {
        return paymentRepository.findTop5ByStatusOrderByPaymentDateDesc(PaymentStatus.COMPLETED)
                .stream()
                .map(payment -> new RecentSaleDTO(
                        payment.getUser().getFirst_name()+" "+payment.getUser().getLast_name(),
                        payment.getAmount(),
                        payment.getPaymentDate()
                ))
                .toList();
    }

   /* public List<Payment> getRecentSales() {
        return paymentRepository.findTop5ByStatusOrderByPaymentDateDesc(PaymentStatus.COMPLETED);
    }*/
}
