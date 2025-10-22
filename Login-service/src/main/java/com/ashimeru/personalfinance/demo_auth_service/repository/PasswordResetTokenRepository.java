package com.ashimeru.personalfinance.demo_auth_service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotToken;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordForgotToken, Long>{
  Optional<PasswordForgotToken> findByToken(String token);
}
