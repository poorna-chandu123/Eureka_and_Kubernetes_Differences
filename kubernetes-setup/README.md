# Banking System V2 — Kubernetes

## File placement
- Put `compose.v2.yml` at the repository root beside `compose.v1.yml` and `pom.xml`.
- Put each `common/**/Dockerfile.v2` beside its existing V1 Dockerfile.
- Put `frontend/Dockerfile.v2` and `frontend/proxy.kubernetes.conf.json` in the existing `frontend/` folder.
- Put all `kubernetes-setup/*-v2.yaml` files in the existing `kubernetes-setup/` folder.

## Build all V2 images together
From the repository root:
```bash
docker compose -f compose.v2.yml config --quiet
docker compose -f compose.v2.yml build
docker image ls
```
This builds/tag images; it does not deploy them to Kubernetes. V1 files remain unchanged.

## Important before deploying all services
- Keep V1 `config-repo` YAML files unchanged. Create a separate V2 configuration set.
- V2 services must use `spring.config.import: configserver:http://config-server-v2:8888`.
- Disable Eureka only for V2. The Deployment YAMLs set common Eureka client environment flags, but verify behavior against the project's Spring Cloud dependencies and startup logs.
- V2 Gateway routes must use Kubernetes Service addresses (`http://auth-server-v2:9000`, `http://customer-service-v2:8081`, `http://account-service-v2:8082`) rather than V1 `lb://...` routes unless Kubernetes-aware discovery is configured. Preserve existing route paths and security filters.
- MySQL remains outside Kubernetes. Verify `host.docker.internal` connectivity from a pod before relying on it.
- Ensure Docker Desktop Kubernetes can access the locally built images before applying Deployments.
- TCP readiness probes are starter checks only; they do not validate downstream dependencies.

## Deployment order
1. Build images using `compose.v2.yml`.
2. Apply namespace and Config Server Deployment/Service.
3. Verify Config Server is ready and serves V2 configuration.
4. Deploy customer, account, auth, gateway, then frontend.
