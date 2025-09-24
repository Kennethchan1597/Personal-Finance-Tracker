package com.ashimeru.personalfinance.finance_service.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TransactionDto {
    private String type;
    private String category;
    private Double amount;
    private LocalDate date;
    private String description;
}
