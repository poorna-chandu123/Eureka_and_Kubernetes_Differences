# Phase 2 - Customer Service

Create the local database:

CREATE DATABASE customer_service_db;

The application intentionally reads DB_USERNAME and DB_PASSWORD from environment variables so credentials are not committed to the GitHub repository.

For local testing, set:
DB_USERNAME=root
DB_PASSWORD=<your MySQL password>

APIs:
POST http://localhost:8081/api/customers
GET  http://localhost:8081/api/customers/{customerId}

Build from repository root:
mvn clean package -DskipTests

This phase implements Customer Service business logic only. Eureka/Feign/Gateway/JWT/Config Server integration is handled in later phases.
