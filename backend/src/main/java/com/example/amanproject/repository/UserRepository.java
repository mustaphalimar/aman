package com.example.amanproject.repository;

import com.example.amanproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u " +
            "JOIN FETCH u.role " +
            "LEFT JOIN FETCH u.devices " +
            "WHERE u.role.name = 'CUSTOMER'")
    List<User> findAllCustomersWithDevices();

    // Step 2: Get user with devices only
    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role " +
            "LEFT JOIN FETCH u.devices " +
            "WHERE u.id = :id")
    Optional<User> findByIdWithDevices(@Param("id") Long id);

    // Alternative: Get user with devices and sensors using two queries
    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role " +
            "JOIN FETCH u.role " +
            "WHERE u.id = :id")
    Optional<User> findByIdWithRole(@Param("id") Long id);


    boolean existsByEmail(String email);

    


    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role " +
            "LEFT JOIN FETCH u.devices d " +
            "LEFT JOIN FETCH d.sensors " +
            "WHERE u.role.name = 'CUSTOMER'")
    List<User> findAllCustomersWithDeviceAndSensors();

    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.role " +
            "LEFT JOIN FETCH u.devices d " +
            "LEFT JOIN FETCH d.sensors " +
            "WHERE u.id = :id")
    Optional<User> findByIdWithDeviceAndSensors(@Param("id") Long id);

    @Query("SELECT u FROM User u WHERE u.role.name = 'CUSTOMER'")
    List<User> findAllCustomers();

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
    ); */




}
