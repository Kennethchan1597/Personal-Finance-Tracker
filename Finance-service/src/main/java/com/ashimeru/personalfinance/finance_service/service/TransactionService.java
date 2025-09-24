package com.ashimeru.personalfinance.finance_service.service;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ashimeru.personalfinance.finance_service.entity.TransactionEntity;
import com.ashimeru.personalfinance.finance_service.repository.TransactionRepository;

@Service
public class TransactionService {
  @Autowired
  private TransactionRepository transactionRepository;

    public TransactionEntity addTransaction(TransactionEntity tx) {
        return this.transactionRepository.save(tx);
    }

    public List<TransactionEntity> getTransactions(Long userId, LocalDate start, LocalDate end) {
        if (start != null && end != null) {
            return this.transactionRepository.findByUserIdAndDateBetween(userId, start, end);
        }
        return this.transactionRepository.findByUserId(userId);
    }

    public List<TransactionEntity> getTransactionsByUserId(Long userId) {
        return this.transactionRepository.findByUserId(userId);
    }

}