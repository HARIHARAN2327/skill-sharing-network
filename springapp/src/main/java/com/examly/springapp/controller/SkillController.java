package com.examly.springapp.controller;

import com.examly.springapp.model.Skill;
import com.examly.springapp.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService){
        this.skillService = skillService;
    }

    @PostMapping("/addSkill")
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill){
        return ResponseEntity.ok(skillService.saveSkill(skill));
    }

    @GetMapping("/allSkills")
    public ResponseEntity<List<Skill>> getAllSkills(){
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id){
        return ResponseEntity.ok(skillService.getSkillById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable Long id, @Valid @RequestBody Skill updatedSkill){
        return ResponseEntity.ok(skillService.updateSkill(id, updatedSkill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long id){
        skillService.deleteSkill(id);
        return ResponseEntity.ok("Skill with ID " + id + " deleted successfully");
    }

    // Extra filtering endpoints
    @GetMapping("/byCategory")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@RequestParam String category){
        return ResponseEntity.ok(skillService.getSkillsByCategory(category));
    }

    @GetMapping("/byDifficulty")
    public ResponseEntity<List<Skill>> getSkillsByDifficulty(@RequestParam String difficulty){
        return ResponseEntity.ok(skillService.getSkillsByDifficulty(difficulty));
    }

    @GetMapping("/activeSkills")
    public ResponseEntity<List<Skill>> getActiveSkills(){
        return ResponseEntity.ok(skillService.getActiveSkills());
    }
}
