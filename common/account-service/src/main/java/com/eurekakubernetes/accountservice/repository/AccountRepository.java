package com.eurekakubernetes.accountservice.repository;
import com.eurekakubernetes.accountservice.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AccountRepository extends JpaRepository<Account,Long> {}
