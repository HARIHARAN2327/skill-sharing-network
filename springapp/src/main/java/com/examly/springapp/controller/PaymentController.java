package com.examly.springapp.controller;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.List;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository repo;

    public PaymentController(PaymentRepository repo) {
        this.repo = repo;
    }

    public static class GenerateRequest {
        public Long userId;
        public Integer amount; // INR
        public String reference; // e.g., membership type
    }

    public static class GenerateResponse {
        public String transactionId;
        public String data; // Encoded payload string for QR
        public String status;
    }

    public static class StatusResponse {
        public String transactionId;
        public String status;
    }

    @PostMapping("/generateQR")
    public ResponseEntity<GenerateResponse> generate(@RequestBody GenerateRequest req) {
        Payment p = new Payment();
        p.setId(UUID.randomUUID().toString());
        p.setUserId(req.userId);
        p.setAmount(req.amount);
        p.setReference(req.reference);
        p.setStatus("PENDING");
        p.setCreatedAt(Instant.now());
        repo.save(p);

        String payload = String.format("{\"tx\":\"%s\",\"uid\":%d,\"am\":%d,\"ref\":\"%s\"}",
                p.getId(), p.getUserId(), p.getAmount(), Optional.ofNullable(p.getReference()).orElse(""));

        p.setQrData(payload);
        repo.save(p);

        GenerateResponse res = new GenerateResponse();
        res.transactionId = p.getId();
        res.data = payload;
        res.status = p.getStatus();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<StatusResponse> status(@PathVariable String id) {
        StatusResponse res = new StatusResponse();
        res.transactionId = id;
        String status = repo.findById(id).map(Payment::getStatus).orElse("NOT_FOUND");
        res.status = status;
        return ResponseEntity.ok(res);
    }

    @PostMapping("/confirm/{id}")
    public ResponseEntity<StatusResponse> confirm(@PathVariable String id) {
        Payment p = repo.findById(id).orElse(null);
        if (p != null) {
            p.setStatus("COMPLETED");
            repo.save(p);
        }
        StatusResponse res = new StatusResponse();
        res.transactionId = id;
        res.status = p == null ? "NOT_FOUND" : p.getStatus();
        return ResponseEntity.ok(res);
    }

    public static class UploadResponse {
        public String transactionId;
        public String status;
        public String screenshotPath;
    }

    @PostMapping(value = "/uploadScreenshot/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<UploadResponse> upload(@PathVariable String id, @RequestPart("file") MultipartFile file) throws IOException {
        Payment p = repo.findById(id).orElse(null);
        UploadResponse res = new UploadResponse();
        res.transactionId = id;
        if (p == null) {
            res.status = "NOT_FOUND";
            return ResponseEntity.ok(res);
        }
        Path dir = Paths.get("uploads");
        if (!Files.exists(dir)) Files.createDirectories(dir);
        String ext = Optional.ofNullable(file.getOriginalFilename()).filter(f -> f.contains(".")).map(f -> f.substring(f.lastIndexOf('.'))).orElse(".png");
        Path target = dir.resolve(id + "_" + System.currentTimeMillis() + ext);
        Files.write(target, file.getBytes());
        p.setScreenshotPath(target.toString());
        p.setStatus("SUBMITTED");
        repo.save(p);
        res.status = p.getStatus();
        res.screenshotPath = p.getScreenshotPath();
        return ResponseEntity.ok(res);
    }

    public static class PaymentView {
        public String id;
        public Long userId;
        public Integer amount;
        public String reference;
        public String status;
        public String screenshotPath;
        public String qrData;
        public Instant createdAt;
    }

    @GetMapping("/pendingVerification")
    public ResponseEntity<List<PaymentView>> pending() {
        List<Payment> list = repo.findByStatus("SUBMITTED");
        List<PaymentView> out = list.stream().map(p -> {
            PaymentView v = new PaymentView();
            v.id = p.getId();
            v.userId = p.getUserId();
            v.amount = p.getAmount();
            v.reference = p.getReference();
            v.status = p.getStatus();
            v.screenshotPath = p.getScreenshotPath();
            v.qrData = p.getQrData();
            v.createdAt = p.getCreatedAt();
            return v;
        }).toList();
        return ResponseEntity.ok(out);
    }

    @PostMapping("/verifyPayment/{id}")
    public ResponseEntity<StatusResponse> verify(@PathVariable String id) {
        Payment p = repo.findById(id).orElse(null);
        if (p != null) {
            p.setStatus("VERIFIED");
            repo.save(p);
        }
        StatusResponse res = new StatusResponse();
        res.transactionId = id;
        res.status = p == null ? "NOT_FOUND" : p.getStatus();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/screenshot/{id}")
    public ResponseEntity<byte[]> screenshot(@PathVariable String id) throws IOException {
        Payment p = repo.findById(id).orElse(null);
        if (p == null || p.getScreenshotPath() == null) {
            return ResponseEntity.notFound().build();
        }
        Path path = Paths.get(p.getScreenshotPath());
        if (!Files.exists(path)) return ResponseEntity.notFound().build();
        byte[] data = Files.readAllBytes(path);
        String mime = Files.probeContentType(path);
        return ResponseEntity.ok()
                .header("Content-Type", mime == null ? "image/png" : mime)
                .body(data);
    }

    public static class MemberStatus {
        public Long userId;
        public boolean member;
    }

    @GetMapping("/isMember/{userId}")
    public ResponseEntity<MemberStatus> isMember(@PathVariable Long userId) {
        MemberStatus res = new MemberStatus();
        res.userId = userId;
        res.member = !repo.findByUserIdAndStatus(userId, "VERIFIED").isEmpty();
        return ResponseEntity.ok(res);
    }
}
