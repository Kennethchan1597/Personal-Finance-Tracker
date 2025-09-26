package com.ashimeru.personalfinance.finance_service.dto;

import java.time.LocalDate;
import com.ashimeru.personalfinance.finance_service.entity.CurrencyType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionDto {
    private String category;
    private Double amount;
    private LocalDate date;
    private String description;
    @Enumerated(EnumType.STRING)
    private CurrencyType currency;
    private CurrencyType manualCurrency;
}
