package com.ashimeru.personalfinance.finance_service.security;

import java.util.Collection;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import com.ashimeru.personalfinance.finance_service.entity.CurrencyType;

public class UserAuthentication implements Authentication {

    private final Long userId;
    private final CurrencyType defaultCurrency;
    private boolean authenticated = true;

    public UserAuthentication(Long userId, CurrencyType defaultCurrency) {
        this.userId = userId;
        this.defaultCurrency = defaultCurrency;
    }

    public CurrencyType getDefaultCurrency() {
        return defaultCurrency;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return userId;
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated)
            throws IllegalArgumentException {
        this.authenticated = isAuthenticated;
    }

    @Override
    public String getName() {
        return String.valueOf(userId);
    }
}

