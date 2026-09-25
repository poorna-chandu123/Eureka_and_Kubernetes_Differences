package com.eurekakubernetes.accountservice.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateAccountRequest {
 @NotNull(message="customerId is required") private Long customerId;
 @NotNull(message="accountType is required")
 @Size(min=2,max=30,message="accountType must be between 2 and 30 characters") private String accountType;
 public Long getCustomerId(){return customerId;} public String getAccountType(){return accountType;}
 public void setCustomerId(Long v){customerId=v;} public void setAccountType(String v){accountType=v;}
}
