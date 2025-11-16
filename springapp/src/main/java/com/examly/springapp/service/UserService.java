package com.examly.springapp.service;

import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    // Hash password before saving
    public User saveUser(User user){
        if(user.getPasswordHash() != null){
            user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        }
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
    }

    public void deleteUser(Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException("User with ID " + id + " not found");
        }
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User updatedUser){
        return userRepository.findById(id)
                .map(existing -> {
                    existing.setUsername(updatedUser.getUsername().trim().toLowerCase());
                    existing.setEmail(updatedUser.getEmail().trim().toLowerCase());
                    if(updatedUser.getPasswordHash() != null){
                        existing.setPasswordHash(passwordEncoder.encode(updatedUser.getPasswordHash()));
                    }
                    existing.setRole(updatedUser.getRole());
                    existing.setSkillProfile(updatedUser.getSkillProfile());
                    existing.setLearningPreferences(updatedUser.getLearningPreferences());
                    existing.setCommunitySettings(updatedUser.getCommunitySettings());
                    existing.setCreatedDate(updatedUser.getCreatedDate());
                    existing.setLastLogin(updatedUser.getLastLogin());
                    existing.setIsActive(updatedUser.getIsActive());
                    return userRepository.save(existing);
                })
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
    }

    // Find user by email or username
    public User findByEmailOrUsername(String identifier){
        if(identifier == null) return null;
        String id = identifier.trim().toLowerCase();
        return userRepository.findByEmail(id)
                .orElse(userRepository.findByUsername(id)
                        .orElse(null));
    }

    // Check password during login
    public boolean checkPassword(String rawPassword, String encodedPassword){
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
