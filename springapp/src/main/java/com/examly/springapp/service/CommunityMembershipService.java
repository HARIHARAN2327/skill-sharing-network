package com.examly.springapp.service;

import com.examly.springapp.exception.SkillShareNotFoundException;
import com.examly.springapp.model.CommunityMembership;
import com.examly.springapp.repository.CommunityMembershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityMembershipService {

    private final CommunityMembershipRepository membershipRepository;

    public CommunityMembershipService(CommunityMembershipRepository membershipRepository) {
        this.membershipRepository = membershipRepository;
    }

    public CommunityMembership saveMembership(CommunityMembership membership) {
        return membershipRepository.save(membership);
    }

    public List<CommunityMembership> getAllMemberships() {
        return membershipRepository.findAll();
    }

    public CommunityMembership getMembershipById(Long id) {
        return membershipRepository.findById(id)
                .orElseThrow(() -> new SkillShareNotFoundException("Membership with ID " + id + " not found"));
    }

    public List<CommunityMembership> getMembershipsByUser(Long userId) {
        return membershipRepository.findByUserId(userId);
    }

    public List<CommunityMembership> getMembershipsByCommunity(Long communityId) {
        return membershipRepository.findByCommunityId(communityId);
    }

    public List<CommunityMembership> getMembershipsByType(String type) {
        return membershipRepository.findByMembershipType(type);
    }

    public List<CommunityMembership> getActiveMemberships(boolean isActive) {
        return membershipRepository.findByIsActive(isActive);
    }
    public CommunityMembership updateMembership(Long id, CommunityMembership updatedMembership) {
        return membershipRepository.findById(id)
                .map(existing -> {
                    existing.setUserId(updatedMembership.getUserId());
                    existing.setCommunityId(updatedMembership.getCommunityId());
                    existing.setJoinDate(updatedMembership.getJoinDate());
                    existing.setMembershipType(updatedMembership.getMembershipType());
                    existing.setIsActive(updatedMembership.getIsActive());
                    return membershipRepository.save(existing);
                })
                .orElseThrow(() -> new SkillShareNotFoundException("Membership with ID " + id + " not found"));
    }

    public void deleteMembership(Long id) {
        if (!membershipRepository.existsById(id)) {
            throw new SkillShareNotFoundException("Membership with ID " + id + " not found");
        }
        membershipRepository.deleteById(id);
    }
}
