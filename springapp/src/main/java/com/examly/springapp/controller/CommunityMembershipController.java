package com.examly.springapp.controller;

import com.examly.springapp.model.CommunityMembership;
import com.examly.springapp.service.CommunityMembershipService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/memberships")
public class CommunityMembershipController {

    private final CommunityMembershipService membershipService;

    public CommunityMembershipController(CommunityMembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @PostMapping("/add")
    public ResponseEntity<CommunityMembership> createMembership(@Valid @RequestBody CommunityMembership membership) {
        return ResponseEntity.ok(membershipService.saveMembership(membership));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CommunityMembership>> getAllMemberships() {
        return ResponseEntity.ok(membershipService.getAllMemberships());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityMembership> getMembershipById(@PathVariable Long id) {
        return ResponseEntity.ok(membershipService.getMembershipById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CommunityMembership>> getMembershipsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(membershipService.getMembershipsByUser(userId));
    }

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<CommunityMembership>> getMembershipsByCommunity(@PathVariable Long communityId) {
        return ResponseEntity.ok(membershipService.getMembershipsByCommunity(communityId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<CommunityMembership>> getMembershipsByType(@PathVariable String type) {
        return ResponseEntity.ok(membershipService.getMembershipsByType(type));
    }

    @GetMapping("/active/{isActive}")
    public ResponseEntity<List<CommunityMembership>> getActiveMemberships(@PathVariable boolean isActive) {
        return ResponseEntity.ok(membershipService.getActiveMemberships(isActive));
    }
    @PutMapping("/{id}")
    public ResponseEntity<CommunityMembership> updateMembership(@PathVariable Long id, @Valid @RequestBody CommunityMembership updatedMembership) {
        return ResponseEntity.ok(membershipService.updateMembership(id, updatedMembership));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMembership(@PathVariable Long id) {
        membershipService.deleteMembership(id);
        return ResponseEntity.ok("Membership with ID " + id + " deleted successfully");
    }
}