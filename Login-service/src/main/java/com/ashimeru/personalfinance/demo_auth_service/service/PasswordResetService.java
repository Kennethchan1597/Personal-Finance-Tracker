package com.ashimeru.personalfinance.demo_auth_service.service;

import java.util.Optional;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordResetDto;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotOtpEntity;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;

public interface PasswordResetService {
  void savePasswordForgotOtp(String Otp, UserEntity userEntity);

  void deleteOtp(PasswordForgotOtpEntity Otp);

  Optional<PasswordForgotOtpEntity> findByOtp(String Otp);

  Optional<PasswordForgotOtpEntity> findByUser(UserEntity userEntity);

  Optional<PasswordForgotOtpEntity> findByUserAndOtp(UserEntity userEntity, String otp);

  String generateForgotPasswordOtp();
 
  void resetPassword(UserEntity userEntity, PasswordResetDto dto);

  boolean verifyOtp(String inputOtp, UserEntity userEntity);

}
