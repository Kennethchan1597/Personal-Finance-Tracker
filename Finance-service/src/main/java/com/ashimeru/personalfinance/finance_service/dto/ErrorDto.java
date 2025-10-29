package com.ashimeru.personalfinance.finance_service.dto;

import java.time.ZonedDateTime;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ErrorDto {
  private String message;
  private Code code;
  private int status;
  private ZonedDateTime timestamp;

  public static enum Code{
    TOKEN_INVALID(1, "Invalid token", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(2, "Token expired", HttpStatus.UNAUTHORIZED),
    TRANSACTION_NOT_FOUND(3, "Transaction Not Found", HttpStatus.NOT_FOUND);

    private final HttpStatus httpStatus;
    private final int code;
    private final String message;

    private Code(int code, String message, HttpStatus httpStatus) {
      this.code = code;
      this.message = message;
      this.httpStatus = httpStatus;
    }

    public int getCode() {
      return this.code;
    }

    public String getMessage() {
      return this.message;
    }

    public HttpStatus getHttpStatus() {
      return this.httpStatus;
    }

    public static Code getFromCode(int code) {
      for (Code c : Code.values()) {
        if(c.getCode() == code)
        return c;
      }
      throw new IllegalArgumentException("No enum constant with code " + code);
    }
  }
}
