package com.examly.springapp.controller;

import com.examly.springapp.model.UserSkill;
import com.examly.springapp.service.UserSkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/userSkills")
public class UserSkillController {

    private final UserSkillService userSkillService;

    public UserSkillController(UserSkillService userSkillService) {
        this.userSkillService = userSkillService;
    }

    @PostMapping("/add")
    public ResponseEntity<UserSkill> createUserSkill(@Valid @RequestBody UserSkill userSkill) {
        return ResponseEntity.ok(userSkillService.saveUserSkill(userSkill));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserSkill>> getAllUserSkills() {
        return ResponseEntity.ok(userSkillService.getAllUserSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserSkill> getUserSkillById(@PathVariable Long id) {
        return ResponseEntity.ok(userSkillService.getUserSkillById(id));
    }

    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<UserSkill>> getUserSkillsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(userSkillService.getUserSkillsByUserId(userId));
    }

    @GetMapping("/bySkill/{skillId}")
    public ResponseEntity<List<UserSkill>> getUserSkillsBySkillId(@PathVariable Long skillId) {
        return ResponseEntity.ok(userSkillService.getUserSkillsBySkillId(skillId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSkill> updateUserSkill(@PathVariable Long id, @Valid @RequestBody UserSkill updatedUserSkill) {
        return ResponseEntity.ok(userSkillService.updateUserSkill(id, updatedUserSkill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserSkill(@PathVariable Long id) {
        userSkillService.deleteUserSkill(id);
        return ResponseEntity.ok("UserSkill with ID " + id + " deleted successfully");
    }
}
