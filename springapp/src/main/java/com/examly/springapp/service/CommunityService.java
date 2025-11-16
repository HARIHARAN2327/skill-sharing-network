package com.examly.springapp.service;

import com.examly.springapp.exception.SkillShareNotFoundException;
import com.examly.springapp.model.Community;
import com.examly.springapp.repository.CommunityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public Community saveCommunity(Community community) {
        return communityRepository.save(community);
    }

    public List<Community> getAllCommunities() {
        return communityRepository.findAll();
    }

    public Community getCommunityById(Long id) {
        return communityRepository.findById(id)
                .orElseThrow(() -> new SkillShareNotFoundException("Community with ID " + id + " not found"));
    }

    public List<Community> getCommunitiesByCategory(String category) {
        return communityRepository.findByCategory(category);
    }

    public List<Community> getCommunitiesByLocation(String location) {
        return communityRepository.findByLocation(location);
    }

    public List<Community> getActiveCommunities(boolean isActive) {
        return communityRepository.findByIsActive(isActive);
    }

    public Community updateCommunity(Long id, Community updatedCommunity) {
        return communityRepository.findById(id)
                .map(existing -> {
                    existing.setCommunityName(updatedCommunity.getCommunityName());
                   existing.setDescription(updatedCommunity.getDescription());                existing.setCategory(updatedCommunity.getCategory());                existing.setLocation(updatedCommunity.getLocation());             existing.setMemberCount(updatedCommunity.getMemberCount());               existing.setAdminId(updatedCommunity.getAdminId());            existing.setIsActive(updatedCommunity.getIsActive());
                    return communityRepository.save(existing);
                })
                .orElseThrow(() -> new SkillShareNotFoundException("Community with ID " + id + " not found"));
    }
    public void deleteCommunity(Long id) {
        if (!communityRepository.existsById(id)) {
            throw new SkillShareNotFoundException("Community with ID " + id + " not found");
        }
        communityRepository.deleteById(id);
    }
}
