package com.example.amanproject.repository;

import com.example.amanproject.model.Role;
import com.example.amanproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public interface RoleRepository extends JpaRepository<Role, Long>  {

    Optional<Role> findByName(String name);
}
