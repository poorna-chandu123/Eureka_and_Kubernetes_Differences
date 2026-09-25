# Phase 5 - Existing Customer Service + Account Service Updates

Replace/add the files in the corresponding existing projects.

## Customer Service changes
1. Replace `pom.xml` with the included POM.
2. Add/replace `src/main/java/com/eurekakubernetes/customerservice/security/SecurityConfig.java`.
3. Replace `src/main/resources/application.yml` with the included file.

Result: all Customer Service APIs require a valid JWT except actuator health.

## Account Service changes
1. Replace `pom.xml` with the included POM.
2. Add/replace `src/main/java/com/eurekakubernetes/accountservice/security/SecurityConfig.java`.
3. Add `src/main/java/com/eurekakubernetes/accountservice/feign_client_call/FeignSecurityConfig.java`.
4. Replace `src/main/java/com/eurekakubernetes/accountservice/feign_client_call/CustomerClient.java` with the included version.
5. Replace `src/main/resources/application.yml` with the included file.

Result:
- Normal Account APIs require a valid JWT.
- DELETE /api/accounts/{accountId} requires MANAGER role.
- The Feign call from Account Service to Customer Service forwards the current user's Bearer token, so Customer Service can validate the same JWT.

## Important
Use exactly the same local JWT secret and issuer in all four applications.
