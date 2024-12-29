package com.ai.SpringAiDemo.controller;

import com.ai.SpringAiDemo.config.JwtProvider;
import com.ai.SpringAiDemo.model.User;
import com.ai.SpringAiDemo.repository.UserRepository;
import com.ai.SpringAiDemo.response.AuthResponse;
import com.ai.SpringAiDemo.service.CreateUserService;
import com.ai.SpringAiDemo.service.LogInService;
import com.ai.SpringAiDemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.regex.Pattern;
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private CreateUserService createUserService;

    @Autowired
    private LogInService logInService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();
        String username = user.getUsername();
        String mobile = user.getMobile();

        // Validate email
        if (!createUserService.isValidEmail(email)) {
            AuthResponse response = new AuthResponse("Invalid email format", false);
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        // Check if email or mobile exists
        if (createUserService.isEmailExist(email)) {
            AuthResponse response = new AuthResponse("Email is already used with another account", false);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        if (createUserService.isMobileExist(mobile)) {
            AuthResponse response = new AuthResponse("Mobile number is already used with another account", false);
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        }

        // Create user
         createUserService.createUser(email, username, password, mobile);

        // Generate JWT token
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);
        String token = logInService.generateToken(authentication);

        AuthResponse response = new AuthResponse("Register success", true);
        response.setJwt(token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> signin(@RequestBody User loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        Authentication authentication = logInService.authenticate(username, password);
        String token = logInService.generateToken(authentication);

        AuthResponse response = new AuthResponse("Login success", true);
        response.setJwt(token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
