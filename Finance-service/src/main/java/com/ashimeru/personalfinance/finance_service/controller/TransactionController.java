package com.ashimeru.personalfinance.finance_service.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
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
    private TransactionService service;
    @Autowired
    private EntityMapper entityMapper;

    @PostMapping("/transactions")
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
        return ResponseEntity.ok(service.addTransaction(transactionEntity));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionEntity>> getAllTransactions(
            Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        List<TransactionEntity> transactions =
                this.service.getTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions);
    }

}
