# Phase 3 — Account Service

APIs:
- POST /api/accounts
- DELETE /api/accounts/{accountId}

Database: account_service_db

Phase 3 focuses on Account Service CRUD/lifecycle and its own database.
Customer verification through Feign is implemented in Phase 4, as planned.

Eureka Client is included because Version 1 uses Eureka service discovery. If Eureka Server is not running, registration warnings are expected; the service can still be tested locally.

Set DB_USERNAME and DB_PASSWORD in the current terminal session before running.
Do not commit real passwords.

Build from repository root:
mvn clean package -DskipTests

Run from common/account-service:
mvn spring-boot:run

Port: 8082
