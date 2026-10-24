# V2 Spring Boot and Config Server YAML files

These files are based on the YAML files supplied by the project owner. V1 files are not included and must remain unchanged.

## Copy the files

1. Copy `spring-boot-projects/common/config-server/src/main/resources/application-v2.yml` to:
   `common/config-server/src/main/resources/application-v2.yml`
2. Copy each other `application-v2.yml` to the corresponding service's `src/main/resources/` folder.
3. Copy the whole `config-repo-v2/` folder to the repository root, beside the existing `config-repo/` folder.
4. Commit and push `config-repo-v2/` to the GitHub repository configured in Config Server, because the shown Config Server configuration reads configuration from that Git repository.

## Activate profile v2

The V2 Kubernetes Deployment for each Spring Boot app must set:
`SPRING_PROFILES_ACTIVE=v2`

The Config Server V2 Deployment must also set:
`SPRING_PROFILES_ACTIVE=v2`

Without profile activation, Spring Boot will use `application.yml`, not `application-v2.yml`.

## Config Server behavior

The Config Server V2 profile points to the same Git repository but uses `search-paths: config-repo-v2`. This is separate from the V1 Config Server search path `config-repo`.

Config Server will serve these files by application name and profile:
- `application.yml` — shared V2 settings
- `account-service-v2.yml`
- `auth-server-v2.yml`
- `customer-service-v2.yml`
- `api-gateway-v2.yml`

## Important notes
- MySQL stays outside Kubernetes. The JDBC URL uses `host.docker.internal`, as planned, but verify connectivity from a Kubernetes pod before relying on it.
- V2 gateway routes use Kubernetes Service names in namespace `banking-v2`.
- JWT issuer remains `http://localhost:9000` to match the provided configuration. Before end-to-end testing, verify that this issuer matches the URL/validation behavior in the existing authentication implementation.
- The database credentials and JWT secret are carried over from the supplied files for local learning consistency. Do not use these values in production; move secrets to Kubernetes Secrets or another secret manager.
- The source files supplied did not include any additional OAuth2, CORS, custom Gateway filters, or other properties beyond the shown content. If those exist elsewhere in your current config, add them before deployment.
