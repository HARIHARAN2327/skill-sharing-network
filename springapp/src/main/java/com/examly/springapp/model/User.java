package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String passwordHash;
    private String role;
    private String skillProfile;
    private String learningPreferences;
    private String communitySettings;

    private LocalDateTime createdDate;
    private LocalDateTime lastLogin;
    private boolean isActive;

    // NEW FIELD: followerCount
    @Column(nullable = false) // ensures DB cannot be null
    private int followerCount = 0; // default value

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSkillProfile() { return skillProfile; }
    public void setSkillProfile(String skillProfile) { this.skillProfile = skillProfile; }

    public String getLearningPreferences() { return learningPreferences; }
    public void setLearningPreferences(String learningPreferences) { this.learningPreferences = learningPreferences; }

    public String getCommunitySettings() { return communitySettings; }
    public void setCommunitySettings(String communitySettings) { this.communitySettings = communitySettings; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }

    public boolean getIsActive() { return isActive; }
    public void setIsActive(boolean isActive) { this.isActive = isActive; }

    public int getFollowerCount() { return followerCount; }
    public void setFollowerCount(int followerCount) { this.followerCount = followerCount; }
}
