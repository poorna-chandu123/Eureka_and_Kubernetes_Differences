# Phase 1 Setup

## 1. Create local workspace

Example:

C:\Storage\Eureka_and_Kubernetes_Differences

Extract this ZIP there.

## 2. GitHub repository

Remote:
https://github.com/poorna-chandu123/Eureka_and_Kubernetes_Differences.git

The repository is currently empty when this Phase 1 package was prepared.

From the extracted root:

    git init
    git branch -M main
    git remote add origin https://github.com/poorna-chandu123/Eureka_and_Kubernetes_Differences.git
    git add .
    git commit -m "Phase 1 project foundation"
    git push -u origin main

If `git init` reports the folder is already a Git repository, do not run it again.

## 3. Important order for local startup

Start:

1. Config Server - 8888
2. Eureka Server - 8761
3. Auth Server - 9000
4. Customer Service - 8081
5. Account Service - 8082
6. API Gateway - 9090

The business APIs are intentionally not implemented in Phase 1. They will be added in their respective phases.

## 4. Config Server

Config Server reads the `config-repo` directory from the GitHub repository.

After pushing the repository, verify:

http://localhost:8888/customer-service/default
http://localhost:8888/account-service/default
http://localhost:8888/api-gateway/default

## 5. Eureka

Open:

http://localhost:8761

The registered services will appear after their later startup/configuration phases.

## 6. Build

Each directory is an independent Maven Spring Boot project.

From each project directory:

    mvn clean package

Or open the individual project in IntelliJ and run the main class.

## 7. Phase 1 scope

Included:
- Config Server
- Git-backed Config Repo
- Eureka Server
- API Gateway foundation
- Auth Server foundation
- Customer Service foundation
- Account Service foundation
- Eureka/LoadBalancer/Feign/Circuit Breaker dependencies where appropriate

Not yet implemented:
- Customer REST APIs
- Account REST APIs
- MySQL/JPA
- JWT issuance and validation
- Feign customer-existence call
- Circuit breaker behavior
- Dockerfiles
- Jenkins pipeline
- AWS deployment
- Kubernetes manifests
