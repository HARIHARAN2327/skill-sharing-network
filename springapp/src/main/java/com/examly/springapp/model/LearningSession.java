package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LearningSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mentorId;
    private Long learnerId;
    private Long skillId;

    private LocalDateTime sessionDate;
    private int duration; // in minutes

    private String format;   // e.g., "online", "offline"
    private String status;   // e.g., "scheduled", "completed", "cancelled"
    private String meetingLink;

    // Getters & Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getMentorId() {
        return mentorId;
    }
    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public Long getLearnerId() {
        return learnerId;
    }
    public void setLearnerId(Long learnerId) {
        this.learnerId = learnerId;
    }

    public Long getSkillId() {
        return skillId;
    }
    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public LocalDateTime getSessionDate() {
        return sessionDate;
    }
    public void setSessionDate(LocalDateTime sessionDate) {
        this.sessionDate = sessionDate;
    }

    public int getDuration() {
        return duration;
    }
    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getFormat() {
        return format;
    }
    public void setFormat(String format) {
        this.format = format;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getMeetingLink() {
        return meetingLink;
    }
    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }
}
