package com.example.amanproject.repository;

import com.example.amanproject.model.Payment;
import com.example.amanproject.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findAllByStatus(PaymentStatus status);

    List<Payment> findTop5ByStatusOrderByPaymentDateDesc(PaymentStatus status);

    @Query("SELECT SUM(p.amount) FROM Payment p WHERE p.status = :status")   //calculateTotalRevenueByStatus
    BigDecimal calculateTotalRevenueByStatus(@Param("status") PaymentStatus status);

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.paymentDate BETWEEN :startDate AND :endDate AND p.status = :status")
    long countPaymentsInDateRange(@Param("startDate") Timestamp startDate,
                                  @Param("endDate") Timestamp endDate,
                                  @Param("status") PaymentStatus status);
}

