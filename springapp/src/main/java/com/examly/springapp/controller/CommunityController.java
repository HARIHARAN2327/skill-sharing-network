package com.examly.springapp.controller;

import com.examly.springapp.model.Community;
import com.examly.springapp.service.CommunityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/communities")
public class CommunityController {

    private final CommunityService communityService;

    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @PostMapping("/add")
    public ResponseEntity<Community> createCommunity(@Valid @RequestBody Community community) {
        return ResponseEntity.ok(communityService.saveCommunity(community));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Community>> getAllCommunities() {
        return ResponseEntity.ok(communityService.getAllCommunities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getCommunityById(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getCommunityById(id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Community>> getCommunitiesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(communityService.getCommunitiesByCategory(category));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Community>> getCommunitiesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(communityService.getCommunitiesByLocation(location));
    }

    @GetMapping("/active/{isActive}")
    public ResponseEntity<List<Community>> getActiveCommunities(@PathVariable boolean isActive) {
        return ResponseEntity.ok(communityService.getActiveCommunities(isActive));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Community> updateCommunity(@PathVariable Long id, @Valid @RequestBody Community updatedCommunity) {
        return ResponseEntity.ok(communityService.updateCommunity(id, updatedCommunity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
        return ResponseEntity.ok("Community with ID " + id + " deleted successfully");
    }
}
