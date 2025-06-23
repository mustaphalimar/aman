package com.example.amanproject.security;

import com.example.amanproject.enums.Role;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()
                        .requestMatchers("/api/waterquality/send/{deviceId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/sensors/getall").permitAll()
                        .requestMatchers("/api/mobile/whaterquality/**").hasRole("CUSTOMER")
                                // Restrict POST, PUT, DELETE to ADMIN role
                        .requestMatchers(HttpMethod.POST, "/api/sensors").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/sensors/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/sensors/**").hasRole("ADMIN")
                        .requestMatchers("api/dashboard/revenue").hasRole(Role.ADMIN.toString())
                        .requestMatchers("api/dashboard/devices/active").hasRole(Role.ADMIN.toString())
                        .requestMatchers("api/dashboard/sales").hasRole(Role.ADMIN.toString())
                        .requestMatchers("api/dashboard/subscriptions").hasRole(Role.ADMIN.toString())
                        .requestMatchers("/api/dashboard/recent-sales").hasRole(Role.ADMIN.toString())
                        .requestMatchers("api/customers/**").hasRole(Role.ADMIN.toString())
                        .anyRequest().authenticated()
                )
                .exceptionHandling(exception -> exception
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpStatus.FORBIDDEN.value());
                            response.setContentType("application/json");
                            response.getWriter().write("{\"status\":\"error\",\"message\":\"Access Denied: You are not allowed to access this resource\"}");
                        })
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



}

