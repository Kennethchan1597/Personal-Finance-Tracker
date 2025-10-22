package com.ashimeru.personalfinance.demo_auth_service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotTokenEntity;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordForgotTokenEntity, Long>{
  Optional<PasswordForgotTokenEntity> findByToken(String token);
}
