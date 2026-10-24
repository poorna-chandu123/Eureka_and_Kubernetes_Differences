# V2-only configuration checklist

Keep existing V1 config-repo files unchanged.

1. Config Client URL for V2 services: `configserver:http://config-server-v2:8888`.
2. Disable Eureka client behavior in V2 configuration; verify startup logs to confirm it no longer registers or fetches the Eureka registry.
3. API Gateway V2 routes should use Kubernetes Service DNS:
   - `http://auth-server-v2:9000`
   - `http://customer-service-v2:8081`
   - `http://account-service-v2:8082`
4. Preserve current gateway paths, authentication filters and authorization behavior.
5. Confirm how this project’s Config Server loads `config-repo` before choosing a volume mount or image-copy approach.
6. Test MySQL connectivity from a pod; do not assume `host.docker.internal` works in every Kubernetes configuration.
