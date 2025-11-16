package com.examly.springapp.configuration;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@Configuration
@PropertySource(value = "classpath:application-admin.properties", ignoreResourceNotFound = true)
public class AdminDataInitializer {

    @Value("${app.admin.email:admin@site.com}")
    private String adminEmail;

    @Value("${app.admin.username:admin}")
    private String adminUsername;

    @Value("${app.admin.password:Admin@123}")
    private String adminPassword;

    @Bean
    public CommandLineRunner seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Normalize
            String email = adminEmail == null ? null : adminEmail.trim().toLowerCase();
            String username = adminUsername == null ? null : adminUsername.trim().toLowerCase();

            boolean exists = (email != null && userRepository.findByEmail(email).isPresent())
                    || (username != null && userRepository.findByUsername(username).isPresent());

            if (exists) {
                return;
            }

            User admin = new User();
            admin.setEmail(email);
            admin.setUsername(username);
            // Store encoded password into passwordHash field
            admin.setPasswordHash(passwordEncoder.encode(adminPassword));
            admin.setRole("ADMIN");
            admin.setIsActive(true);
            admin.setCreatedDate(LocalDateTime.now());

            userRepository.save(admin);
            System.out.println("[AdminDataInitializer] Created default admin user: " + username + " (" + email + ")");
        };
    }
}
