# V2 next steps

1. Compare each `Dockerfile.v2` with the corresponding existing V1 `Dockerfile`.
2. Keep `compose.v1.yml`, V1 Dockerfiles, and current V1 `config-repo` YAML files unchanged.
3. Create a separate V2 configuration set. In V2, the Config Server URL must match the Kubernetes Service name.
4. Disable Eureka client discovery only in V2.
5. Change API Gateway V2 routes from `lb://SERVICE-NAME` to Kubernetes Service DNS addresses.
6. Build V2 images, make them available to the Kubernetes node, and test Config Server first.
7. Add the remaining Deployment and Service YAML files one service at a time.

Do not assume that adding `Dockerfile.v2` alone completes V2. The Dockerfile handles packaging; V2 configuration controls service discovery and routing.
