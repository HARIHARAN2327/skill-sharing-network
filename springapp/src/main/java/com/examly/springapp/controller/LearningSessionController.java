package com.examly.springapp.controller;
import com.examly.springapp.model.LearningSession;
import com.examly.springapp.service.LearningSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
@RestController
@RequestMapping("/api/learningSessions")
public class LearningSessionController {
    private final LearningSessionService sessionService;
    public LearningSessionController(LearningSessionService sessionService) {
        this.sessionService = sessionService;
    }
    @PostMapping("/add")
    public ResponseEntity<LearningSession> createSession(@Valid @RequestBody LearningSession session) {
        return ResponseEntity.ok(sessionService.saveSession(session));
    }
    @GetMapping("/all")
    public ResponseEntity<List<LearningSession>> getAllSessions() {
        return ResponseEntity.ok(sessionService.getAllSessions());
    }
    @GetMapping("/{id}")
    public ResponseEntity<LearningSession> getSessionById(@PathVariable Long id) {
        return ResponseEntity.ok(sessionService.getSessionById(id));
    }
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<LearningSession>> getSessionsByMentor(@PathVariable Long mentorId) {
        return ResponseEntity.ok(sessionService.getSessionsByMentor(mentorId));
    }
    @GetMapping("/learner/{learnerId}")
    public ResponseEntity<List<LearningSession>> getSessionsByLearner(@PathVariable Long learnerId) {
        return ResponseEntity.ok(sessionService.getSessionsByLearner(learnerId));
    }
    @GetMapping("/skill/{skillId}")
    public ResponseEntity<List<LearningSession>> getSessionsBySkill(@PathVariable Long skillId) {
        return ResponseEntity.ok(sessionService.getSessionsBySkill(skillId));
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<List<LearningSession>> getSessionsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(sessionService.getSessionsByStatus(status));
    }
    @PutMapping("/{id}")
    public ResponseEntity<LearningSession> updateSession(@PathVariable Long id, @Valid @RequestBody LearningSession updatedSession) {
        return ResponseEntity.ok(sessionService.updateSession(id, updatedSession));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSession(@PathVariable Long id){
        sessionService.deleteSession(id);
        return ResponseEntity.ok("LearningSession with ID "+id+" deleted successfully");
    }
    
}