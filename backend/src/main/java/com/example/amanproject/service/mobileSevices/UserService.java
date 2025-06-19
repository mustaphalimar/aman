package com.example.amanproject.service.mobileSevices;

import com.example.amanproject.dto.mobileDtos.UpdateUserDto;
import com.example.amanproject.model.User;
import com.example.amanproject.repository.mobileRepos.UserMobileRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserMobileRepository userRepository;

    public User updateUserInfo(User user, UpdateUserDto dto) {
        //User user = userRepository.findById(Id)
        //        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (dto.getFirstName() != null)
            user.setFirst_name(dto.getFirstName());

        if (dto.getLastName() != null)
            user.setLast_name(dto.getLastName());

        if (dto.getPhone() != null)
            user.setPhone(dto.getPhone());
        if (dto.getEmail() != null)
            user.setEmail(dto.getEmail());

        return userRepository.save(user);
    }


    public Map<String, Object> getCustomerProfile(Authentication authentication, HttpServletRequest request) {
        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        User user = userOpt.get();
        Map<String, Object> data = new HashMap<>();
        data.put("email", user.getEmail());
        //data.put("username", user.getUsername() );
        data.put("first_name",user.getFirst_name());
        data.put("last_name",user.getLast_name());
        data.put("phone" , user.getPhone());
        data.put("role", user.getRole().getName());
        return data;
    }
}
