package com.eurekakubernetes.customerservice.dto;

import java.time.LocalDateTime;

public record CustomerResponse(
        Long customerId,
        String name,
        String email,
        String phone,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
