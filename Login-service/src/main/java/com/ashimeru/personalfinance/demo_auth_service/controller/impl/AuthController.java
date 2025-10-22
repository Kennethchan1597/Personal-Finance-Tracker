package com.ashimeru.personalfinance.demo_auth_service.controller.impl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import com.ashimeru.personalfinance.demo_auth_service.controller.AuthOperation;
import com.ashimeru.personalfinance.demo_auth_service.dto.AuthResponseDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.ErrorDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.LoginDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordForgotDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.PasswordResetDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.SignUpDto;
import com.ashimeru.personalfinance.demo_auth_service.dto.UserDto;
import com.ashimeru.personalfinance.demo_auth_service.entity.PasswordForgotToken;
import com.ashimeru.personalfinance.demo_auth_service.entity.UserEntity;
import com.ashimeru.personalfinance.demo_auth_service.entity.VerificationTokenEntity;
import com.ashimeru.personalfinance.demo_auth_service.exception.AppException;
import com.ashimeru.personalfinance.demo_auth_service.security.JwtUtil;
import com.ashimeru.personalfinance.demo_auth_service.service.AuthService;
import com.ashimeru.personalfinance.demo_auth_service.service.EmailService;
import com.ashimeru.personalfinance.demo_auth_service.service.PasswordResetService;
import com.ashimeru.personalfinance.demo_auth_service.service.VerificationTokenService;
import jakarta.mail.MessagingException;

@RestController
public class AuthController implements AuthOperation {
  @Autowired
  private AuthService authService;
  @Autowired
  private VerificationTokenService verificationTokenService;
  @Autowired
  private PasswordResetService passwordResetService;
  @Autowired
  private EmailService emailService;
  @Autowired
  private JwtUtil jwtUtil;


  @Override
  public ResponseEntity<String> register(SignUpDto signUpDto) {
    this.authService.register(signUpDto);
    return ResponseEntity.ok().body(
        "Registration Email has been sent, link will be expired in 30 minutes");
  }

  @Override
  public ResponseEntity<AuthResponseDto> login(LoginDto login) {
    UserDto userDto = this.authService.login(login);
    String token = this.jwtUtil.generateToken(userDto);
    return ResponseEntity.ok().body(new AuthResponseDto(userDto, token));
  }

  @Override
  public ResponseEntity<String> verifyUser(String token) {
    UserEntity user = this.verificationTokenService.VerifyUser(token);
    this.authService.saveUser(user);
    VerificationTokenEntity usedToken =
        this.verificationTokenService.findByToken(token).get();
    this.verificationTokenService.deleteToken(usedToken);
    return ResponseEntity.ok().body("Registration is successful");
  }

  @Override
  public ResponseEntity<String> forgotPassword(PasswordForgotDto dto) {
    Optional<UserEntity> userOpt = this.authService.findByEmail(dto.getEmail());
    if (userOpt.isEmpty())
      throw new AppException(ErrorDto.Code.USER_NOT_FOUND);
    UserEntity userEntity = userOpt.get();
    String token = this.passwordResetService.generateForgotPasswordToken();
    String emailLink =
        this.passwordResetService.generateForgotPasswordLink(token);
    try {
      this.emailService.sendPasswordResetEmail(dto.getEmail(), emailLink);
      this.passwordResetService.savePasswordForgotToken(token, userEntity);
      return ResponseEntity.ok()
          .body("Reset Email sent, please reset your password in 15 minutes.");
    } catch (MessagingException e) {
      throw new AppException(ErrorDto.Code.EMAIL_SEND_FAILED);
    }
  }

  @Override
  public ResponseEntity<String> getResetPasswordLink(String token) {
    if (!this.passwordResetService.isVerifiedToken(token)) {
      throw new AppException(ErrorDto.Code.TOKEN_INVALID);
    }
    return ResponseEntity.ok("Valid token");
  }

  @Override
  public ResponseEntity<String> resetPassword(String token, PasswordResetDto dto) {
      PasswordForgotToken passwordForgotToken = this.passwordResetService.findByToken(token)
        .orElseThrow( () -> new AppException(ErrorDto.Code.TOKEN_INVALID));
      UserEntity user = passwordForgotToken.getUser();
      this.passwordResetService.resetPassword(user, dto);
      this.authService.saveUser(user);
      this.passwordResetService.deleteToken(passwordForgotToken);
      return ResponseEntity.ok().body("Password has been reset.");
  }
}
