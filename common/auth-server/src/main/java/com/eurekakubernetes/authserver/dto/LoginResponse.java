package com.eurekakubernetes.authserver.dto;

public record LoginResponse(String token, String tokenType, long expiresInSeconds) {}
