# Config Server + Config Repo setup

This package is for the existing Eureka_and_Kubernetes_Differences project.

## 1. What is included

- `common/config-server` — the actual Spring Boot Config Server.
- `config-repo/application.yml` — shared configuration.
- `config-repo/discovery-server.yml`
- `config-repo/api-gateway.yml`
- `config-repo/auth-server.yml`
- `config-repo/customer-service.yml`
- `config-repo/account-service.yml`

There is intentionally NO `config-server.yml` in `config-repo`.
The Config Server must know its Git repository location before it can read the repository, so its own `application.yml` keeps the Git backend settings.

## 2. Existing service application.yml files

After this package is copied into the project, the five Config Clients should keep only their identity and Config Server import:

spring:
  application:
    name: <service-name>
  config:
    import: configserver:http://localhost:8888

No `bootstrap.yml` is required.

## 3. Environment variables

The Config Repo deliberately does not contain the real database password or JWT secret.

Set these before starting services:

DB_USERNAME=root
DB_PASSWORD=<your MySQL password>
JWT_SECRET=<one shared JWT secret>

The same JWT_SECRET must be available to Auth Server, API Gateway, Customer Service and Account Service.

## 4. Start order

1. Config Server - 8888
2. Eureka Discovery Server - 8761
3. Auth Server - 9000
4. Customer Service - 8081
5. Account Service - 8082
6. API Gateway - 9090

## 5. Config Server verification

After Config Server starts, verify:

http://localhost:8888/application/default
http://localhost:8888/discovery-server/default
http://localhost:8888/api-gateway/default
http://localhost:8888/auth-server/default
http://localhost:8888/customer-service/default
http://localhost:8888/account-service/default

The Config Server should return the resolved configuration from the Git-backed config-repo.
