package com.ashimeru.personalfinance.finance_service.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ashimeru.personalfinance.finance_service.dto.TransactionDto;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class EntityMapper {
  @Autowired
  private ObjectMapper objectMapper;

  public TransactionEntity map(TransactionDto dto) {
    return this.objectMapper.convertValue(dto, TransactionEntity.class);
  }
}
