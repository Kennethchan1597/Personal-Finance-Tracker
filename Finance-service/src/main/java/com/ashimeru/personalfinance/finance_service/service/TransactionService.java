package com.ashimeru.personalfinance.finance_service.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ashimeru.personalfinance.finance_service.dto.ErrorDto;
import com.ashimeru.personalfinance.finance_service.dto.TransactionDto;
import com.ashimeru.personalfinance.finance_service.entity.TransactionEntity;
import com.ashimeru.personalfinance.finance_service.exception.AppException;
import com.ashimeru.personalfinance.finance_service.repository.TransactionRepository;

@Service
public class TransactionService {
  @Autowired
  private TransactionRepository transactionRepository;

    public TransactionEntity addTransaction(TransactionEntity tx) {
        return this.transactionRepository.save(tx);
    }

    // public List<TransactionEntity> getTransactions(Long userId, LocalDate start, LocalDate end) {
    //     if (start != null && end != null) {
    //         return this.transactionRepository.findByUserIdAndDateBetween(userId, start, end);
    //     }
    //     return this.transactionRepository.findByUserId(userId);
    // }

    public List<TransactionEntity> getTransactionsByUserId(Long userId) {
        return this.transactionRepository.findByUserId(userId);
    }

    public String calculateBalance(Long userId) {
        List<TransactionEntity> transactions =  this.getTransactionsByUserId(userId);
        List<Double> positives = transactions.stream().filter(c -> {return c != null && "INCOME".equals(c.getType()) && c.getType() != null;}).map(c -> (c.getAmount())).collect(Collectors.toList());
        List<Double> negatives = transactions.stream().filter(c -> {return c != null && "EXPENSE".equals(c.getType()) && c.getType() != null;}).map(c -> (c.getAmount())).collect(Collectors.toList());
        double positive = 0.0;
        double negative = 0.0;
        for (Double amount : positives) {
            if(amount != null) {
                positive = BigDecimal.valueOf(amount).add(BigDecimal.valueOf(positive)).doubleValue();
            }
        }
        for (Double amount : negatives) {
            if(amount != null) {
                negative = BigDecimal.valueOf(amount).add(BigDecimal.valueOf(negative)).doubleValue();
            }
        }
        double result = BigDecimal.valueOf(positive).subtract(BigDecimal.valueOf(negative)).doubleValue();
        return String.valueOf(result);
    }

    public TransactionEntity updateTransaction(Long id, Long userId, TransactionDto transactionDto) {
        TransactionEntity transactionEntity = this.findTransactionByIdAndUserId(id, userId);
        
        if(transactionDto.getAmount() != null) {
            transactionEntity.setAmount(transactionDto.getAmount());
        }
        if (transactionDto.getCategory() != null) {
            transactionEntity.setCategory(transactionDto.getCategory());
        }
        if (transactionDto.getDate() != null) {
            transactionEntity.setDate(transactionDto.getDate());
        }
        if (transactionDto.getDescription() != null) {
            transactionEntity.setDescription(transactionDto.getDescription());
        }
        if (transactionDto.getCurrency() != null) {
            transactionEntity.setCurrency(transactionDto.getCurrency());
        }

        return this.transactionRepository.save(transactionEntity);
    }

    public TransactionEntity findTransactionByIdAndUserId(Long transactionId, Long userId) {
        return this.transactionRepository.findByIdAndUserId(transactionId, userId)
        .orElseThrow(() -> new AppException(ErrorDto.Code.TRANSACTION_NOT_FOUND));
    }

    public void deleteTransaction(TransactionEntity transactionEntity) {
        this.transactionRepository.delete(transactionEntity);
    }

}