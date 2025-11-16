package com.examly.springapp.controller;

import com.examly.springapp.model.ResetPasswordRequest;
import com.examly.springapp.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/password")
@CrossOrigin(origins = "https://8081-afbbcbdcdbeddeaeaafeabcfedbbfadbaeaab.premiumproject.examly.io/")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

   
    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        String token = passwordResetService.createPasswordResetToken(email);
      
        return ResponseEntity.ok("Password reset token generated: " + token);
    }

    // Reset password
    @PostMapping("/reset")
public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
    passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
    return ResponseEntity.ok("Password has been reset successfully");
}

}
