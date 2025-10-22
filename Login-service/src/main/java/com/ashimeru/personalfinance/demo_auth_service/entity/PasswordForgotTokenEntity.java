package com.ashimeru.personalfinance.demo_auth_service.entity;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Table(name = "password_forgot_token_entity")
@Getter
@AllArgsConstructor
@Builder
public class PasswordForgotTokenEntity {
  @Id
  @GeneratedValue (strategy = GenerationType.IDENTITY)
  private Long id;
  private String token;

  @OneToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;

  private LocalDateTime expiryDate;

  public boolean isExpired() {
    return this.expiryDate.isBefore(LocalDateTime.now());
  }
}
