package com.example.amanproject.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends GenericFilterBean {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String authHeader = httpRequest.getHeader("Authorization");
        String path = httpRequest.getRequestURI();

        if (path.startsWith("/api/auth/login")) {
            chain.doFilter(request, response);
            return;
        }

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);


            try {
                String username = jwtUtil.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtUtil.validateToken(token, userDetails.getUsername())) {

                        // Extract role from the token
                        String role = jwtUtil.extractRole(token);

                        // Ensure it starts with "ROLE_"
                        if (!role.startsWith("ROLE_")) {
                            role = "ROLE_" + role;
                        }

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        Collections.singleton(new SimpleGrantedAuthority(role))
                                );

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }

            }
            catch (io.jsonwebtoken.ExpiredJwtException e) {
                sendErrorResponse(httpResponse, "Token expired", HttpServletResponse.SC_UNAUTHORIZED);
                return;

            } catch (io.jsonwebtoken.MalformedJwtException |
                     io.jsonwebtoken.SignatureException |
                     IllegalArgumentException e) {
                sendErrorResponse(httpResponse, "Invalid token", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        chain.doFilter(request, response);
    }



    private void sendErrorResponse(HttpServletResponse response, String message, int statusCode) throws IOException {
        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }


}