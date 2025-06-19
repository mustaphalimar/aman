package com.example.amanproject.repository;

import com.example.amanproject.dto.CustomerDTO;
import com.example.amanproject.dto.CustomerOverviewDTO;
import com.example.amanproject.enums.PaymentStatus;
import com.example.amanproject.enums.Role;

import com.example.amanproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);


/*
    @Query("SELECT new com.example.amanproject.dto.CustomerOverviewDTO(" +
            " CONCAT(u.first_name, ' ', u.last_name), u.email, " +
            "'ALL', " +
            "SUM(p.amount), " +
            "COUNT(DISTINCT d.id)) " +
            "FROM User u " +
            "LEFT JOIN u.devices d " +
            "LEFT JOIN Payment p ON p.user.id = u.id " +
            "WHERE u.role = :clientRole AND p.status = :completedStatus " +
            "GROUP BY u.id")
    List<CustomerOverviewDTO> fetchCustomerOverview(
            @Param("completedStatus") PaymentStatus completedStatus,
            @Param("clientRole") Role clientRole
    );*/



    @Query("SELECT new com.example.amanproject.dto.CustomerDTO(" +
            "u.id, u.first_name, u.last_name, u.phone, u.email, u.password, d.deviceType, SUM(p.amount), COUNT(DISTINCT d.id)) " +
            "FROM User u " +
            "LEFT JOIN u.devices d " +
            "LEFT JOIN Payment p ON p.user.id = u.id " +
            "WHERE u.role = :clientRole AND p.status = :completedStatus " +
            "GROUP BY u.id , d.deviceType")
    List<CustomerDTO> fetchCustomerOverview(@Param("completedStatus") PaymentStatus completedStatus,
                                            @Param("clientRole") com.example.amanproject.model.Role clientRole);







}
