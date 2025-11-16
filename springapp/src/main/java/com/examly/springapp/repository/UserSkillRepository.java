package com.examly.springapp.repository;

import com.examly.springapp.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUserId(Long userId);
    List<UserSkill> findBySkillId(Long skillId);
}
