# Banking System — V2 Kubernetes Review Package

## Purpose
This package keeps V1 unchanged and adds separate V2 files for review.

- V1 remains in `compose.v1.yml` and the existing `Dockerfile` files.
- V2 files use the `-v2` suffix, including `Dockerfile.v2`.
- V2 is intended to use Kubernetes Services/DNS instead of Eureka discovery.
- MySQL remains outside Docker/Kubernetes, as planned.

## Important: review package, not yet the complete deployment
The Dockerfiles are separate copies of the current build pattern so they can be compared side-by-side. A Dockerfile packages the Java application; it does not by itself disable Eureka.

Before deploying the remaining services, V2-specific runtime configuration must also be applied:
1. Spring Config Client must point to the Kubernetes Config Server Service.
2. Eureka client functionality must be disabled for V2.
3. API Gateway routes must use Kubernetes Service addresses instead of Eureka-based `lb://...` routes.
4. Database URLs must continue to reach the host MySQL instance from the Kubernetes pods; `host.docker.internal` behavior must be verified for the selected Docker Desktop Kubernetes setup.
5. Container images must be available to the Kubernetes node image store.

Do not replace or edit V1 configuration to do this. V2 config should be stored separately and applied only to V2 workloads.

## Dockerfile.v2 locations
- `common/config-server/Dockerfile.v2`
- `common/auth-server/Dockerfile.v2`
- `common/api-gateway/Dockerfile.v2`
- `common/customer-service/Dockerfile.v2`
- `common/account-service/Dockerfile.v2`

There is intentionally no `discovery-server/Dockerfile.v2`: Eureka is not part of the planned V2 architecture.

## Kubernetes files
- `namespace-v2.yaml`
- `config-server-deployment-v2.yaml`
- `config-server-service-v2.yaml`

These include the Config Server resources already being tested in the `banking-v2` namespace. The Config Server manifest currently references `banking-config-server:v2-local`; build/import that image before applying the updated Deployment.

## Build V2 images
Run these commands from the repository root (the folder containing `pom.xml`):

```bash
docker build -f common/config-server/Dockerfile.v2 -t banking-config-server:v2-local .
docker build -f common/auth-server/Dockerfile.v2 -t banking-auth-server:v2-local .
docker build -f common/api-gateway/Dockerfile.v2 -t banking-api-gateway:v2-local .
docker build -f common/customer-service/Dockerfile.v2 -t banking-customer-service:v2-local .
docker build -f common/account-service/Dockerfile.v2 -t banking-account-service:v2-local .
```

These build commands are provided for review; do not run all of them until the V2 runtime configuration is ready. Docker Desktop Kubernetes may need images explicitly loaded/imported into its node image store.

## Next step
Review the new files and compare each `Dockerfile.v2` with its existing `Dockerfile`. Once the file layout is approved, finish V2-only configuration and then deploy one service at a time.
