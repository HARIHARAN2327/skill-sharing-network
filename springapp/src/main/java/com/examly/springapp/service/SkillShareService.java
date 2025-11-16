package com.examly.springapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exception.SkillShareNotFoundException;
import com.examly.springapp.model.SkillShare;
import com.examly.springapp.repository.SkillShareRepository;

@Service
public class SkillShareService {
    private final SkillShareRepository skillShareRepository;

    public SkillShareService(SkillShareRepository skillShareRepository){
        this.skillShareRepository = skillShareRepository;
    }
    
    public SkillShare saveSkillShare(SkillShare skillShare){
        return skillShareRepository.save(skillShare);
    }

    public List<SkillShare>getAllSkillShares(){
        return skillShareRepository.findAll();
    }

    public SkillShare getSkillShareById(Long id){
        return skillShareRepository.findById(id).orElseThrow(()-> new SkillShareNotFoundException("SkillShare with ID "+id+" not found"));
    }

    public List<SkillShare>getSkillSharesByCategory(String category){
        return skillShareRepository.findByCategory(category);
    }

    public List<SkillShare>getSkillSharesSortedBySkillLevel(){
        return skillShareRepository.findAllByOrderBySkillLevelDesc();
    }

    public void deleteSkillShare(long id){
        if(!skillShareRepository.existsById(id)){
            throw new SkillShareNotFoundException("SkillShare with ID "+id+" not found");
        }
        skillShareRepository.deleteById(id);
    }
    public SkillShare updateSkillShare(Long id, SkillShare updatedSkillShare){
        return skillShareRepository.findById(id)
        .map(existing -> {
            existing.setSkillName(updatedSkillShare.getSkillName());
            existing.setCategory(updatedSkillShare.getCategory());
            existing.setSkillLevel(updatedSkillShare.getSkillLevel());
            existing.setUserEmail(updatedSkillShare.getUserEmail());
            existing.setDescription(updatedSkillShare.getDescription());
            existing.setAvailability(updatedSkillShare.getAvailability());
            return skillShareRepository.save(existing);
        })
        .orElseThrow(()-> new SkillShareNotFoundException("SkillShare with ID "+id+" not found"));
    }
}
