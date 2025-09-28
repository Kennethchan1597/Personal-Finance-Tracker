package com.ashimeru.personalfinance.finance_service.security;

import org.springframework.stereotype.Component;
import com.ashimeru.personalfinance.finance_service.dto.ErrorDto;
import com.ashimeru.personalfinance.finance_service.entity.CurrencyType;
import com.ashimeru.personalfinance.finance_service.exception.AppException;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {
    private final String SECRET_KEY;

    public JwtUtil() {
        Dotenv dotenv = Dotenv.load();
        this.SECRET_KEY = dotenv.get("JWT_SECRETKEY");
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token)
                .getBody();
    }

    public Long extractUserId(String token) {
        return extractAllClaims(token).get("id", Long.class);
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public CurrencyType extractDefaultCurrency(String token) {
        return extractAllClaims(token).get("defaultCurrency", CurrencyType.class);
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new AppException(ErrorDto.Code.TOKEN_EXPIRED); // token expired
        } catch (JwtException e) {
            throw new AppException(ErrorDto.Code.TOKEN_INVALID); // invalid token
        }
    }
}

