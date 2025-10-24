package com.ashimeru.personalfinance.demo_auth_service.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ashimeru.personalfinance.demo_auth_service.dto.ErrorDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordResetDto;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotOtpEntity;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;
import com.ashimeru.personalfinance.demo_auth_service.exception.AppException;
import com.ashimeru.personalfinance.demo_auth_service.repository.PasswordForgotOtpRepository;
import com.ashimeru.personalfinance.demo_auth_service.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl implements PasswordResetService {
  @Autowired
  private PasswordForgotOtpRepository PasswordForgotOtpRepository;
  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void savePasswordForgotOtp(String otp, UserEntity userEntity) {
    this.PasswordForgotOtpRepository.deleteByUser(userEntity);
    PasswordForgotOtpEntity entity = PasswordForgotOtpEntity.builder()
        .expDateTime(LocalDateTime.now().plusMinutes(15)).otp(otp)
        .user(userEntity).build();
    this.PasswordForgotOtpRepository.save(entity);
  }

  @Override
  public void deleteOtp(PasswordForgotOtpEntity PasswordForgotOtp) {
    this.PasswordForgotOtpRepository.delete(PasswordForgotOtp);
  }

  @Override
  public Optional<PasswordForgotOtpEntity> findByOtp(String otp) {
    return this.PasswordForgotOtpRepository.findByOtp(otp);
  }

  @Override
  public Optional<PasswordForgotOtpEntity> findByUser(UserEntity userEntity) {
    return this.PasswordForgotOtpRepository.findByUser(userEntity);
  }

  @Override
  public String generateForgotPasswordOtp() {
    Integer otp = (int) (Math.random() * 900000) + 100000; // ensures 100000-999999
    return otp.toString();
  }

  @Override
  public void resetPassword(UserEntity user, PasswordResetDto dto) {
    user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
  }

  @Override
  public Optional<PasswordForgotOtpEntity> findByUserAndOtp(
      UserEntity userEntity, String otp) {
    return this.PasswordForgotOtpRepository.findByUserAndOtp(userEntity, otp);
  }

  @Override
  public boolean verifyOtp(String inputOtp, UserEntity userEntity) {
    PasswordForgotOtpEntity otpEntity =
        this.findByUserAndOtp(userEntity, inputOtp)
            .orElseThrow(() -> new AppException(ErrorDto.Code.TOKEN_INVALID));
    if (otpEntity.isExpired()) {
      throw new AppException(ErrorDto.Code.TOKEN_EXPIRED);
    }
    this.PasswordForgotOtpRepository.save(otpEntity);
    return true;
  }
}

