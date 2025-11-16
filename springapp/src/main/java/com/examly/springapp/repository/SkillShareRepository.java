package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.SkillShare;

public interface SkillShareRepository extends JpaRepository<SkillShare, Long> {
    List<SkillShare> findByCategory(String category);
    List<SkillShare> findAllByOrderBySkillLevelDesc();
}
