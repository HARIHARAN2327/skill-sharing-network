package com.examly.springapp.service;

import com.examly.springapp.exception.SkillShareNotFoundException;
import com.examly.springapp.model.UserSkill;
import com.examly.springapp.repository.UserSkillRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserSkillService {

    private final UserSkillRepository userSkillRepository;

    public UserSkillService(UserSkillRepository userSkillRepository) {
        this.userSkillRepository = userSkillRepository;
    }

    public UserSkill saveUserSkill(UserSkill userSkill) {
        userSkill.setLastUpdated(LocalDateTime.now());
        return userSkillRepository.save(userSkill);
    }

    public List<UserSkill> getAllUserSkills() {
        return userSkillRepository.findAll();
    }

    public UserSkill getUserSkillById(Long id) {
        return userSkillRepository.findById(id)
                .orElseThrow(() -> new SkillShareNotFoundException("UserSkill with ID " + id + " not found"));
    }

    public List<UserSkill> getUserSkillsByUserId(Long userId) {
        return userSkillRepository.findByUserId(userId);
    }

    public List<UserSkill> getUserSkillsBySkillId(Long skillId) {
        return userSkillRepository.findBySkillId(skillId);
    }

    public void deleteUserSkill(Long id) {
        if (!userSkillRepository.existsById(id)) {
            throw new SkillShareNotFoundException("UserSkill with ID " + id + " not found");
        }
        userSkillRepository.deleteById(id);
    }

    public UserSkill updateUserSkill(Long id, UserSkill updatedUserSkill) {
        return userSkillRepository.findById(id)
                .map(existing -> {
                    existing.setUserId(updatedUserSkill.getUserId());
                    existing.setSkillId(updatedUserSkill.getSkillId());
                    existing.setProficiencyLevel(updatedUserSkill.getProficiencyLevel());
                    existing.setYearsExperience(updatedUserSkill.getYearsExperience());
                    existing.setCanTeach(updatedUserSkill.isCanTeach());
                    existing.setCanLearn(updatedUserSkill.isCanLearn());
                    existing.setLastUpdated(LocalDateTime.now());
                    return userSkillRepository.save(existing);
                })
                .orElseThrow(() -> new SkillShareNotFoundException("UserSkill with ID " + id + " not found"));
    }
}
