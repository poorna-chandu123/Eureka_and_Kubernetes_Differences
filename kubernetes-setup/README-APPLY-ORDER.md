# V2 apply order

From the repository root:
1. `docker compose -f compose.v2.yml config --quiet`
2. `docker compose -f compose.v2.yml build`
3. `docker image ls` and verify all `v2-local` tags.
4. `kubectl apply -f kubernetes-setup/namespace-v2.yaml`
5. Apply Config Server Deployment and Service, then check `kubectl get pods,deployments,services -n banking-v2`.
6. Do not apply other service manifests until Config Server is ready and its V2 configuration is verified.

Applying `config-server-deployment-v2.yaml` will switch the desired image from the old `banking-config-server:local` tag to `banking-config-server:v2-local`. Build the new image and confirm Kubernetes can access it first.
