package com.eurekakubernetes.accountservice.exception;
public class AccountNotFoundException extends RuntimeException {
 public AccountNotFoundException(Long id){super("Account not found with id: "+id);}
}
