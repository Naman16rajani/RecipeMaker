package com.ai.SpringAiDemo.service;

import com.ai.SpringAiDemo.model.User;
import com.ai.SpringAiDemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class CreateUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Validate email format
    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    // Check if email exists
    public boolean isEmailExist(String email) {
        return userRepository.findByEmail(email) != null;
    }

    // Check if mobile exists
    public boolean isMobileExist(String mobile) {
        return userRepository.findByMobile(mobile) != null;
    }

    // Create and save user
    public void createUser(String email, String username, String password, String mobile) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setMobile(mobile);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
