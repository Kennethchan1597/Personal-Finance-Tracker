package com.ashimeru.personalfinance.demo_auth_service.service;

import java.util.Optional;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordResetDto;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotToken;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;

public interface PasswordResetService {
  void savePasswordForgotToken(String token, UserEntity userEntity);

  void deleteToken(PasswordForgotToken passwordResetToken);

  Optional<PasswordForgotToken> findByToken(String token);

  boolean isVerifiedToken(String token);

  String generateForgotPasswordToken();

  String generateForgotPasswordLink(String token);
 
  void resetPassword(UserEntity userEntity, PasswordResetDto dto);
  
}
