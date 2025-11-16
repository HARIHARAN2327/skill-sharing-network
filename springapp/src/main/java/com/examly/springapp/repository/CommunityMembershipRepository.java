package com.examly.springapp.repository;

import com.examly.springapp.model.CommunityMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunityMembershipRepository extends JpaRepository<CommunityMembership, Long> {
    List<CommunityMembership> findByUserId(Long userId);
    List<CommunityMembership> findByCommunityId(Long communityId);
    List<CommunityMembership> findByMembershipType(String membershipType);
    List<CommunityMembership> findByIsActive(boolean isActive);
}
