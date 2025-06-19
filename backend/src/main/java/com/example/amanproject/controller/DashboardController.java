package com.example.amanproject.controller;

import com.example.amanproject.dto.RecentSaleDTO;
import com.example.amanproject.model.Payment;
import com.example.amanproject.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;


@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/revenue") //Returns total paid revenue
    public ResponseEntity<BigDecimal> getTotalRevenue() {
        return ResponseEntity.ok(dashboardService.getTotalRevenue());
    }

    @GetMapping("/devices/active") //Returns active device count.
    public ResponseEntity<Long> getActiveDevices() {

        return ResponseEntity.ok(dashboardService.getActiveDevices());
    }

    @GetMapping("/sales")  //Returns the total of sales  this month
    public ResponseEntity<Long> getTotalSales() {
        return ResponseEntity.ok(dashboardService.getTotalSales());
    }

    @GetMapping("/subscriptions")  //Total subscriptions
    public ResponseEntity<Long> getTotalSubscriptions() {
        return ResponseEntity.ok(dashboardService.getTotalSubscriptions());
    }





    @GetMapping("/recent-sales")
    public ResponseEntity<List<RecentSaleDTO>> getRecentSales() {
        List<RecentSaleDTO> sales = dashboardService.getRecentSales();
        return ResponseEntity.ok(sales);
    }
}
