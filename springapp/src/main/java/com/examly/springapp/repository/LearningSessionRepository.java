package com.examly.springapp.repository;

import com.examly.springapp.model.LearningSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {
    List<LearningSession> findByMentorId(Long mentorId);
    List<LearningSession> findByLearnerId(Long learnerId);
    List<LearningSession> findBySkillId(Long skillId);
    List<LearningSession> findByStatus(String status);
}
