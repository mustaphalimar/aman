package com.example.amanproject.controller.ApiController;

import com.example.amanproject.dto.mobileDtos.UpdateUserDto;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.mobileRepos.UserMobileRepository;
import com.example.amanproject.service.mobileSevices.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
@Tag(name = "User Profile", description = "User profile management endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserMobileRepository userMobileRepository;
    @Autowired
    private HttpServletRequest request;

    @PutMapping("/update")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update user profile", description = "Updates the current user's profile information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User updated successfully", content = @Content(schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Requires CUSTOMER role"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<?> updateUser(
            @Parameter(description = "User update data", required = true) @RequestBody UpdateUserDto updateUserDto,
            @Parameter(description = "Authentication object", hidden = true) Authentication authentication) {
        String email = authentication.getName();
        System.out.println("This is the email extract from the authenticated get name()" + email);
        User user = userMobileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        User updatedUser = userService.updateUserInfo(user, updateUserDto);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User updated successfully");
        response.put("user", updatedUser);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get current user profile", description = "Retrieves the current authenticated user's profile information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile retrieved successfully", content = @Content(schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Requires CUSTOMER role")
    })
    public ResponseEntity<Map<String, Object>> getCustomerProfile(
            @Parameter(description = "Authentication object", hidden = true) Authentication authentication,
            @Parameter(description = "HTTP request object", hidden = true) HttpServletRequest request) {

        return ResponseEntity.ok(userService.getCustomerProfile(authentication, request));
        /*
         * String authHeader = request.getHeader("Authorization");
         * 
         * if (authHeader != null && authHeader.startsWith("Bearer ")) {
         * String token = authHeader.substring(7);
         * System.out.println("🔐 Token received: " + token);
         * } else {
         * System.out.println("🚫 No Bearer token found");
         * }
         * 
         * 
         * String usernameOrEmail = authentication.getName(); // souvent l'email
         * Optional<User> userOpt = userRepository.findByEmail(usernameOrEmail);
         * 
         * 
         * Map<String, Object> data = new HashMap<>();
         * data.put("username", authentication.getName());
         * data.put("email", authentication.getEmail());
         * data.put("fullname", user.getFirstname() + " " + user.getLastname());
         * data.put("role", user.getRole().name());
         * 
         * return ResponseEntity.ok(data);
         */
    }
}
