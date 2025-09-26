package com.ashimeru.personalfinance.finance_service.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ashimeru.personalfinance.finance_service.entity.TransactionEntity;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long>{
  
  List<TransactionEntity> findByUserId(Long userId);
  List<TransactionEntity> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);

}
