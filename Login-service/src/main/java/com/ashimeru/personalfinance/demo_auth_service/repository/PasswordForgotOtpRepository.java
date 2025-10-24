package com.ashimeru.personalfinance.demo_auth_service.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotOtpEntity;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;

@Repository
public interface PasswordForgotOtpRepository extends JpaRepository<PasswordForgotOtpEntity, Long>{
  Optional<PasswordForgotOtpEntity> findByOtp(String otp);
  Optional<PasswordForgotOtpEntity> findByUser(UserEntity userEntity);
  Optional<PasswordForgotOtpEntity> findByUserAndOtp (UserEntity userEntity, String otp );
  void deleteByUser(UserEntity userEntity);
}
