package com.example.amanproject.repository;

import com.example.amanproject.model.Subscription;
import com.example.amanproject.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findAllByStatus(SubscriptionStatus status);

    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.startDate BETWEEN :startDate AND :endDate")
    long countNewSubscriptionsInRange(@Param("startDate") Timestamp startDate,
                                      @Param("endDate") Timestamp endDate);

    List<Subscription> findByUserId(Long userId);
}

