package com.example.amanproject.repository.mobileRepos;

import com.example.amanproject.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMobileRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);

}
