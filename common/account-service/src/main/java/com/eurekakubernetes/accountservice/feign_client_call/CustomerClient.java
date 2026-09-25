package com.eurekakubernetes.accountservice.feign_client_call;

import com.eurekakubernetes.accountservice.dto.CustomerResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "customer-service", configuration = FeignSecurityConfig.class)
public interface CustomerClient {

    @GetMapping("/api/customers/{customerId}")
    CustomerResponse getCustomerById(@PathVariable("customerId") Long customerId);
}
