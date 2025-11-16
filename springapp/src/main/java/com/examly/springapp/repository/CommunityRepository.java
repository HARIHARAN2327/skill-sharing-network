package com.examly.springapp.repository;

import com.examly.springapp.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByCategory(String category);
    List<Community> findByLocation(String location);
    List<Community> findByIsActive(boolean isActive);
}
