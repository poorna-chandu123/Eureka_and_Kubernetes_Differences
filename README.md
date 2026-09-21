# Eureka and Kubernetes Differences

A small Spring Boot microservices reference project used to compare two deployment/service-discovery architectures.

## Current phase

Phase 1 - project foundation.

## Stack baseline

- Java 21
- Spring Boot 4.0.8
- Spring Cloud 2025.1.3
- Maven
- Git/GitHub
- Docker
- Jenkins
- MySQL (business-service phases)
- Eureka (Version 1)
- Kubernetes/EKS (Version 2)

Spring Cloud 2025.1.3 is used with Spring Boot 4.0.8 for a current compatible Spring Cloud/Spring Boot baseline.

## Project layout

- `common/` - application projects shared by both architectures
- `eureka-setup/discovery-server/` - Eureka server used only by Version 1
- `config-repo/` - Git-backed configuration files
- `kubernetes-setup/` - reserved for Version 2 Kubernetes manifests (added later)

## Phase 1 services

- Config Server: 8888
- Eureka Server: 8761
- API Gateway: 9090
- Auth Server: 9000
- Customer Service: 8081
- Account Service: 8082

Business APIs, JWT issuance/validation, Feign calls, databases, circuit breaker behavior, Docker, Jenkins pipelines, AWS and Kubernetes manifests are implemented in later phases.

## Important

The Config Server is configured to read `config-repo` from the GitHub repository. Push the repository contents before starting the Config Server.

Repository:
https://github.com/poorna-chandu123/Eureka_and_Kubernetes_Differences
