package com.ashimeru.personalfinance.demo_auth_service.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ashimeru.personalfinance.demo_auth_service.dto.ErrorDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordResetDto;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotToken;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;
import com.ashimeru.personalfinance.demo_auth_service.exception.AppException;
import com.ashimeru.personalfinance.demo_auth_service.repository.PasswordResetTokenRepository;
import com.ashimeru.personalfinance.demo_auth_service.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {
  @Autowired
  private PasswordResetTokenRepository passwordResetTokenRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void savePasswordForgotToken(String token, UserEntity userEntity) {
    PasswordForgotToken entity = PasswordForgotToken.builder()
        .expiryDate(LocalDateTime.now().plusMinutes(15)).token(token)
        .user(userEntity).build();
    this.passwordResetTokenRepository.save(entity);
  }

  @Override
  public void deleteToken(PasswordForgotToken passwordResetToken) {
    this.passwordResetTokenRepository.delete(passwordResetToken);
  }

  @Override
  public Optional<PasswordForgotToken> findByToken(String token) {
    return this.passwordResetTokenRepository.findByToken(token);
  }

  @Override
  public boolean isVerifiedToken(String token) {
    PasswordForgotToken passwordForgotToken = this.findByToken(token)
        .orElseThrow(() -> new AppException(ErrorDto.Code.TOKEN_INVALID));
    if (passwordForgotToken.isExpired())
      throw new AppException(ErrorDto.Code.TOKEN_EXPIRED);
    return true;
  }

  @Override
  public String generateForgotPasswordToken() {
    return UUID.randomUUID().toString();
  }

  @Override
  public String generateForgotPasswordLink(String token) {
    return "http://localhost:8090/auth/password/reset?token=" + token;
  }

  @Override
  public void resetPassword(UserEntity user, PasswordResetDto dto) {
    user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
  }

}
