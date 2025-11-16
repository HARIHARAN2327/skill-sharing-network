package com.examly.springapp.repository;

import com.examly.springapp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, String> {
    List<Payment> findByStatus(String status);
    List<Payment> findByUserIdAndStatus(Long userId, String status);
}
