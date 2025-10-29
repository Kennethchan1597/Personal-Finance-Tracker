package com.ashimeru.personalfinance.finance_service.controller;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ashimeru.personalfinance.finance_service.dto.TransactionDto;
import com.ashimeru.personalfinance.finance_service.entity.EntityMapper;
import com.ashimeru.personalfinance.finance_service.entity.TransactionEntity;
import com.ashimeru.personalfinance.finance_service.security.UserAuthentication;
import com.ashimeru.personalfinance.finance_service.service.TransactionService;

@RestController
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private EntityMapper entityMapper;

    @PostMapping(value = "/transactions")
    public ResponseEntity<TransactionEntity> createTransaction(
            @RequestBody TransactionDto dto, Authentication authentication) {
        UserAuthentication userAuthentication =
                (UserAuthentication) authentication;
        Long userId = (Long) authentication.getPrincipal();
        TransactionEntity transactionEntity = entityMapper.map(dto);
        transactionEntity.setUserId(userId);
        transactionEntity.setCurrency(dto.getManualCurrency() == null
                ? userAuthentication.getDefaultCurrency()
                : dto.getManualCurrency());
        return ResponseEntity.ok(transactionService.addTransaction(transactionEntity));
    }

    @GetMapping(value = "/transactions")
    public ResponseEntity<List<TransactionEntity>> getAllTransactions(
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        List<TransactionEntity> transactions =
                this.transactionService.getTransactionsByUserId(userId);
                List<TransactionEntity> results = transactions.stream().sorted(Comparator.comparing(TransactionEntity::getDate).reversed()).collect(Collectors.toList());
        return ResponseEntity.ok(results);
    }
    
    @GetMapping(value = "/transactions/balance")
    public ResponseEntity<String> getBalance(Authentication authentication) {
         Long userId = (Long) authentication.getPrincipal();
         String balance = this.transactionService.calculateBalance(userId);
         return ResponseEntity.ok(balance);
    }

    @PatchMapping(value = "/transactions/edit")
    public ResponseEntity<TransactionEntity> updateTransaction(@PathVariable Long id, @RequestBody TransactionDto transactionDto, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        TransactionEntity transactionEntity = this.transactionService.updateTransaction(id, userId, transactionDto);
    return ResponseEntity.ok(transactionEntity);
    }

    @DeleteMapping(value = "/transactions/{id}")
    public ResponseEntity<TransactionEntity> deleteTransaction(@PathVariable Long id, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        TransactionEntity transactionEntity = this.transactionService.findTransactionByIdAndUserId(id, userId);
        this.transactionService.deleteTransaction(transactionEntity);
        return ResponseEntity.ok(transactionEntity);
    }

    @GetMapping("/transactions/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable Long id, Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        TransactionEntity transactionEntity = this.transactionService.findTransactionByIdAndUserId(id, userId);
        return ResponseEntity.ok(transactionEntity);
    }

}
