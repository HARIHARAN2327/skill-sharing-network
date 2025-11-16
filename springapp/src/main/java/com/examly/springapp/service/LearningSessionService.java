package com.examly.springapp.service;

import com.examly.springapp.exception.SkillShareNotFoundException;
import com.examly.springapp.model.LearningSession;
import com.examly.springapp.repository.LearningSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LearningSessionService {

    private final LearningSessionRepository sessionRepository;

    public LearningSessionService(LearningSessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public LearningSession saveSession(LearningSession session) {
        return sessionRepository.save(session);
    }

    public List<LearningSession> getAllSessions() {
        return sessionRepository.findAll();
    }

    public LearningSession getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new SkillShareNotFoundException("LearningSession with ID " + id + " not found"));
    }

    public List<LearningSession> getSessionsByMentor(Long mentorId) {
        return sessionRepository.findByMentorId(mentorId);
    }

    public List<LearningSession> getSessionsByLearner(Long learnerId) {
        return sessionRepository.findByLearnerId(learnerId);
    }

    public List<LearningSession> getSessionsBySkill(Long skillId) {
        return sessionRepository.findBySkillId(skillId);
    }

    public List<LearningSession> getSessionsByStatus(String status) {
        return sessionRepository.findByStatus(status);
    }

    public LearningSession updateSession(Long id, LearningSession updatedSession) {
        return sessionRepository.findById(id)
                .map(existing -> {
                    existing.setMentorId(updatedSession.getMentorId());
                    existing.setLearnerId(updatedSession.getLearnerId());
                    existing.setSkillId(updatedSession.getSkillId());
                    existing.setSessionDate(updatedSession.getSessionDate());
                    existing.setDuration(updatedSession.getDuration());
                    existing.setFormat(updatedSession.getFormat());
                    existing.setStatus(updatedSession.getStatus());
                    existing.setMeetingLink(updatedSession.getMeetingLink());
                    return sessionRepository.save(existing);
                })
                .orElseThrow(() -> new SkillShareNotFoundException("LearningSession with ID " + id + " not found"));
    }

    public void deleteSession(Long id) {
        if (!sessionRepository.existsById(id)) {
            throw new SkillShareNotFoundException("LearningSession with ID " + id + " not found");
        }
        sessionRepository.deleteById(id);
    }
}
