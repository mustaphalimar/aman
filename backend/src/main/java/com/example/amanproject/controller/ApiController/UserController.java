package com.example.amanproject.controller.ApiController;

import com.example.amanproject.dto.mobileDtos.UpdateUserDto;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.mobileRepos.UserMobileRepository;
import com.example.amanproject.service.mobileSevices.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mobile/user/profile")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserMobileRepository userMobileRepository;
    @Autowired
    private HttpServletRequest request;





    @PutMapping("/update")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserDto updateUserDto,
                                        Authentication authentication) {
        String email = authentication.getName();
        System.out.println("This is the email extract from the authenticated get name()"+email);
        User user = userMobileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User updatedUser = userService.updateUserInfo(user , updateUserDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User updated successfully");
        response.put("user", updatedUser);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Map<String, Object>> getCustomerProfile(Authentication authentication, HttpServletRequest request) {

        return ResponseEntity.ok(userService.getCustomerProfile(authentication, request));
        /*
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("🔐 Token received: " + token);
        } else {
            System.out.println("🚫 No Bearer token found");
        }


        String usernameOrEmail = authentication.getName(); // souvent l'email
        Optional<User> userOpt = userRepository.findByEmail(usernameOrEmail);


        Map<String, Object> data = new HashMap<>();
        data.put("username", authentication.getName());
        data.put("email", authentication.getEmail());
        data.put("fullname", user.getFirstname() + " " + user.getLastname());
        data.put("role", user.getRole().name());

        return ResponseEntity.ok(data);*/
    }
}
