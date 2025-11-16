package com.examly.springapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.examly.springapp.model.SkillShare;
import com.examly.springapp.service.SkillShareService;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins="https://8081-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io")
@RequestMapping("/api/skillshares")
public class SkillShareController {
    private final SkillShareService skillShareService;

    public SkillShareController(SkillShareService skillShareService){
        this.skillShareService = skillShareService;
    }

    @PostMapping("/addSkillShare")
    public ResponseEntity<SkillShare> createSkillShare(@Valid @RequestBody SkillShare skillShare){
        return ResponseEntity.ok(skillShareService.saveSkillShare(skillShare));
    }

    @GetMapping("/allSkillShares")
    public ResponseEntity<List<SkillShare>> getAllSkillshares(){
        return ResponseEntity.ok(skillShareService.getAllSkillShares());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkillShare> getSkillShareById(@PathVariable Long id){
        return ResponseEntity.ok(skillShareService.getSkillShareById(id));
    }
    @GetMapping("/byCategory")
    public ResponseEntity<List<SkillShare>> getSkillSharesByCategory(@RequestParam String category){
        return ResponseEntity.ok(skillShareService.getSkillSharesByCategory(category));
    }
    @GetMapping("/sortedBySkillLevel")
    public ResponseEntity<List<SkillShare>> getSkillSharesSortedBySkillLevel(){
        return ResponseEntity.ok(skillShareService.getSkillSharesSortedBySkillLevel());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkillShare(@PathVariable Long id){
        skillShareService.deleteSkillShare(id);
        return ResponseEntity.ok("SkillShare with ID "+id+ " deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<SkillShare> updateSkillShare(@PathVariable Long id ,@Valid @RequestBody SkillShare updatedSkillShare){
        SkillShare skillShare = skillShareService.updateSkillShare(id, updatedSkillShare);
        return ResponseEntity.ok(skillShare);
    }
}