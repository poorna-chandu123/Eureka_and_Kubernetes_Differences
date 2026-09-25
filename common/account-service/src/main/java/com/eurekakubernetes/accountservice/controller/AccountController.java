package com.eurekakubernetes.accountservice.controller;
import com.eurekakubernetes.accountservice.dto.*;
import com.eurekakubernetes.accountservice.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
 private final AccountService accountService;
 public AccountController(AccountService s){accountService=s;}
 @PostMapping public ResponseEntity<AccountResponse> create(@Valid @RequestBody CreateAccountRequest r){
  return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(r));
 }
 @DeleteMapping("/{accountId}") public ResponseEntity<Void> delete(@PathVariable Long accountId){
  accountService.deleteAccount(accountId); return ResponseEntity.noContent().build();
 }
}
