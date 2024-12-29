package com.ai.SpringAiDemo.service;

import com.ai.SpringAiDemo.config.JwtProvider;
import com.ai.SpringAiDemo.model.User;
import com.ai.SpringAiDemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LogInService {

    @Autowired
    private UserService customUserDetails;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // Authenticate user
    public Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    // Generate JWT token
    public String generateToken(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return JwtProvider.generateToken(authentication);
    }
}
