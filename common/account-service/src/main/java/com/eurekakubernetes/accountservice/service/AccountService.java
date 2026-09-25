package com.eurekakubernetes.accountservice.service;

import com.eurekakubernetes.accountservice.dto.AccountResponse;
import com.eurekakubernetes.accountservice.dto.CreateAccountRequest;
import com.eurekakubernetes.accountservice.dto.CustomerResponse;
import com.eurekakubernetes.accountservice.entity.Account;
import com.eurekakubernetes.accountservice.exception.AccountNotFoundException;
import com.eurekakubernetes.accountservice.exception.CustomerServiceException;
import com.eurekakubernetes.accountservice.feign_client_call.CustomerClient;
import com.eurekakubernetes.accountservice.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerClient customerClient;

    public AccountService(AccountRepository accountRepository,
                          CustomerClient customerClient) {
        this.accountRepository = accountRepository;
        this.customerClient = customerClient;
    }

    public AccountResponse createAccount(CreateAccountRequest request) {

        // Verify customer exists through Customer Service using Feign.
        try {
            CustomerResponse customer =
                    customerClient.getCustomerById(request.getCustomerId());

            if (customer == null) {
                throw new CustomerServiceException(
                        "Customer not found with id: " + request.getCustomerId());
            }

        } catch (CustomerServiceException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new CustomerServiceException(
                    "Unable to verify customer with id: "
                            + request.getCustomerId());
        }

        // Customer exists, so create the account.
        Account account = new Account();

        account.setCustomerId(request.getCustomerId());
        account.setAccountType(request.getAccountType());
        account.setStatus("ACTIVE");

        Account savedAccount = accountRepository.save(account);

        return toResponse(savedAccount);
    }

    public void deleteAccount(Long accountId) {

        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));

        account.setStatus("CLOSED");

        accountRepository.save(account);
    }

    private AccountResponse toResponse(Account account) {

        return new AccountResponse(
                account.getAccountId(),
                account.getCustomerId(),
                account.getAccountType(),
                account.getStatus(),
                account.getCreatedAt(),
                account.getUpdatedAt()
        );
    }
}