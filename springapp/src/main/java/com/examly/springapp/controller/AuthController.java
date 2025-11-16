package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import com.examly.springapp.configuration.JWTUtil;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // -------- SIGNUP --------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        // Check if email or username already exists
        if(userService.findByEmailOrUsername(signupRequest.getEmail()) != null ||
           userService.findByEmailOrUsername(signupRequest.getUsername()) != null){
            return ResponseEntity.badRequest().body("Email or Username already exists");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername().trim().toLowerCase());
        user.setEmail(signupRequest.getEmail().trim().toLowerCase());
        user.setPasswordHash(signupRequest.getPassword());
        user.setRole("USER");
        userService.saveUser(user);

        String token = jwtUtil.generateToken(user.getEmail(), null);
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    // -------- LOGIN --------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getIdentifier() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Identifier and password are required");
        }

        User user = userService.findByEmailOrUsername(loginRequest.getIdentifier());
        if (user != null && userService.checkPassword(loginRequest.getPassword(), user.getPasswordHash())) {
            String token = jwtUtil.generateToken(user.getEmail(), null);
            return ResponseEntity.ok(new AuthResponse(token, user));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // -------- ADMIN HELPERS --------
    @GetMapping("/hasAdmin")
    public ResponseEntity<?> hasAdmin() {
        boolean exists = userRepository.findFirstByRole("ADMIN").isPresent();
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/bootstrapAdmin")
    public ResponseEntity<?> bootstrapAdmin(@RequestBody SignupRequest signupRequest) {
        // Create an admin user only if none exists
        boolean exists = userRepository.findFirstByRole("ADMIN").isPresent();
        if (exists) return ResponseEntity.badRequest().body("Admin already exists");

        if(userService.findByEmailOrUsername(signupRequest.getEmail()) != null ||
           userService.findByEmailOrUsername(signupRequest.getUsername()) != null){
            return ResponseEntity.badRequest().body("Email or Username already exists");
        }

        User admin = new User();
        admin.setUsername(signupRequest.getUsername().trim().toLowerCase());
        admin.setEmail(signupRequest.getEmail().trim().toLowerCase());
        admin.setPasswordHash(signupRequest.getPassword());
        admin.setRole("ADMIN");
        userService.saveUser(admin);

        String token = jwtUtil.generateToken(admin.getEmail(), null);
        return ResponseEntity.ok(new AuthResponse(token, admin));
    }

    // -------- DTOs --------
    public static class LoginRequest {
        private String identifier;
        private String password;

        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class SignupRequest {
        private String username;
        private String email;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;
        private User user;

        public AuthResponse(String token, User user){
            this.token = token;
            // Build a sanitized copy to avoid mutating a managed entity instance
            User safe = new User();
            safe.setId(user.getId());
            safe.setUsername(user.getUsername());
            safe.setEmail(user.getEmail());
            safe.setRole(user.getRole());
            safe.setSkillProfile(user.getSkillProfile());
            safe.setLearningPreferences(user.getLearningPreferences());
            safe.setCommunitySettings(user.getCommunitySettings());
            safe.setCreatedDate(user.getCreatedDate());
            safe.setLastLogin(user.getLastLogin());
            safe.setIsActive(user.getIsActive());
            safe.setPasswordHash(null);
            this.user = safe;
        }

        public String getToken() { return token; }
        public User getUser() { return user; }
    }
}
