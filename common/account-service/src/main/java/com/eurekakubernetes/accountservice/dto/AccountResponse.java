package com.eurekakubernetes.accountservice.dto;
import java.time.LocalDateTime;
public class AccountResponse {
 private Long accountId, customerId; private String accountType,status; private LocalDateTime createdAt,updatedAt;
 public AccountResponse(){}
 public AccountResponse(Long a,Long c,String t,String s,LocalDateTime ca,LocalDateTime ua){accountId=a;customerId=c;accountType=t;status=s;createdAt=ca;updatedAt=ua;}
 public Long getAccountId(){return accountId;} public Long getCustomerId(){return customerId;} public String getAccountType(){return accountType;}
 public String getStatus(){return status;} public LocalDateTime getCreatedAt(){return createdAt;} public LocalDateTime getUpdatedAt(){return updatedAt;}
}
