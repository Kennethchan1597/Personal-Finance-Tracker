package com.ashimeru.personalfinance.demo_auth_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PasswordResetDto {
  @NotBlank
  private String newPassword;
  @NotBlank
  private String confirmPassword;
}
