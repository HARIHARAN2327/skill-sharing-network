package com.examly.springapp.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByCategory(String category);
    List<Skill> findByDifficultyLevel(String difficultyLevel);
    List<Skill> findByIsActive(boolean isActive);

}
