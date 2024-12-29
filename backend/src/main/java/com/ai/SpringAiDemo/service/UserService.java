package com.ai.SpringAiDemo.service;
import com.ai.SpringAiDemo.model.User;
import com.ai.SpringAiDemo.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Create or save a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Retrieve all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // Retrieve a user by ID
    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    // Retrieve a user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update a user
    public User updateUser(ObjectId id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setUsername(user.getUsername());
            updatedUser.setEmail(user.getEmail());
            if (user.getPassword() != null) { // Only update password if provided
                updatedUser.setPassword(user.getPassword());
            }
            return userRepository.save(updatedUser);
        }
        return null; // Or throw an exception
    }

    // Delete a user by ID
    public boolean deleteUserById(ObjectId id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        System.out.println("loadUserByUsername user"+user);

        if(user==null) {
            throw new UsernameNotFoundException("User not found with this email"+username);
        }

        System.out.println("Loaded user: " + user.getUsername() );
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);
    }
}
