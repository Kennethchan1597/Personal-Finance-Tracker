package com.ashimeru.personalfinance.finance_service.exception;

import com.ashimeru.personalfinance.finance_service.dto.ErrorDto;

public class AppException extends RuntimeException {
  private final ErrorDto.Code code;

  public AppException(ErrorDto.Code code) {
    super(code.getMessage());
    this.code = code;
  }

  public ErrorDto.Code getCode() {
    return code;
  }
}
