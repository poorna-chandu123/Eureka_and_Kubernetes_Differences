# Phase 5 - Auth Server + API Gateway

This package contains the complete Phase 5 Auth Server and API Gateway projects for the existing repository.

## Ports
- Auth Server: 9000
- API Gateway: 9090
- Eureka: 8761
- Customer Service: 8081
- Account Service: 8082

## JWT
- Algorithm: HS256 (local learning project)
- Expiration: 30 seconds
- Issuer: http://localhost:9000
- The same local secret must be configured in Auth Server, API Gateway, Customer Service and Account Service.
- Do NOT use the sample secret in a real environment. Store secrets in environment variables/Secrets Manager/Kubernetes Secret.

## Database
Create the Auth Server database before starting it:

CREATE DATABASE auth_service_db;

Set the existing environment variables:

DB_USERNAME
DB_PASSWORD

JPA creates the `users` table automatically.

## Seed users
On first startup Auth Server creates these users if they do not already exist:

MANAGER:
username: manager
password: manager123
role: MANAGER

USER:
username: user
password: user123
role: USER

Passwords are stored as BCrypt hashes.

## Login
POST http://localhost:9090/api/auth/login
Content-Type: application/json

{
  "username": "manager",
  "password": "manager123"
}

The response contains a Bearer token valid for 30 seconds.

## Gateway routes
- /api/auth/** -> AUTH-SERVER
- /api/customers/** -> CUSTOMER-SERVICE
- /api/accounts/** -> ACCOUNT-SERVICE

All non-login gateway routes require a valid JWT.

## Important
The Auth Server is a simple custom JWT issuer for this learning project. It is NOT a full OAuth2/OIDC Authorization Server. That is intentional for the current project scope.
