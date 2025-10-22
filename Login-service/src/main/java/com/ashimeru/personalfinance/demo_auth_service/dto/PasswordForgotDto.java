package com.ashimeru.personalfinance.demo_auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PasswordForgotDto {
  private String email;
}
