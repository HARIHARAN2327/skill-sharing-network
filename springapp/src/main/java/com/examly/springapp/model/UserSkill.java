package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long skillId;
    private String proficiencyLevel;
    private int yearsExperience;
    private boolean canTeach;
    private boolean canLearn;

    private LocalDateTime lastUpdated = LocalDateTime.now();

    // Getters & Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSkillId() {
        return skillId;
    }
    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }
    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public int getYearsExperience() {
        return yearsExperience;
    }
    public void setYearsExperience(int yearsExperience) {
        this.yearsExperience = yearsExperience;
    }

    public boolean isCanTeach() {
        return canTeach;
    }
    public void setCanTeach(boolean canTeach) {
        this.canTeach = canTeach;
    }

    public boolean isCanLearn() {
        return canLearn;
    }
    public void setCanLearn(boolean canLearn) {
        this.canLearn = canLearn;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
