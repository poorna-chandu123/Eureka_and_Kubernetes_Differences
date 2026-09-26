package com.eurekakubernetes.accountservice.controller;

import com.eurekakubernetes.accountservice.dto.*;
import com.eurekakubernetes.accountservice.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService s) {
        accountService = s;
    }

    @PostMapping
    public ResponseEntity<AccountResponse> create(@Valid @RequestBody CreateAccountRequest r) {
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.createAccount(r));
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        // Note : it will 204 because we're not returning any response body
        // return ResponseEntity.noContent().build();

          // Note : if we need single string return means like below
         // return ResponseEntity.ok(accountId + "Account closed successfully");

        // Note : if we need Multiple string return means like below
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Account closed successfully");
        response.put("accountId", accountId);
        response.put("status", "CLOSED");

        return ResponseEntity.ok(response);
    }
}
