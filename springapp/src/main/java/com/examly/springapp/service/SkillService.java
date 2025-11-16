package com.examly.springapp.service;

import com.examly.springapp.exception.SkillNotFoundException;
import com.examly.springapp.model.Skill;
import com.examly.springapp.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository){
        this.skillRepository = skillRepository;
    }

    public Skill saveSkill(Skill skill){
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills(){
        return skillRepository.findAll();
    }

    public Skill getSkillById(Long id){
        return skillRepository.findById(id)
                .orElseThrow(() -> new SkillNotFoundException("Skill with ID " + id + " not found"));
    }

    public void deleteSkill(Long id){
        if(!skillRepository.existsById(id)){
            throw new SkillNotFoundException("Skill with ID " + id + " not found");
        }
        skillRepository.deleteById(id);
    }

    public Skill updateSkill(Long id, Skill updatedSkill){
        return skillRepository.findById(id)
                .map(existing -> {
                    existing.setSkillName(updatedSkill.getSkillName());
                    existing.setCategory(updatedSkill.getCategory());
                    existing.setSubcategory(updatedSkill.getSubcategory());
                    existing.setDescription(updatedSkill.getDescription());
                    existing.setDifficultyLevel(updatedSkill.getDifficultyLevel());
                    existing.setEstimatedLearningTime(updatedSkill.getEstimatedLearningTime());
                    existing.setIsActive(updatedSkill.getIsActive());
                    return skillRepository.save(existing);
                })
                .orElseThrow(() -> new SkillNotFoundException("Skill with ID " + id + " not found"));
    }

    // Extra filtering methods
    public List<Skill> getSkillsByCategory(String category){
        return skillRepository.findByCategory(category);
    }

    public List<Skill> getSkillsByDifficulty(String difficulty){
        return skillRepository.findByDifficultyLevel(difficulty);
    }

    public List<Skill> getActiveSkills(){
        return skillRepository.findByIsActive(true);
    }
}
