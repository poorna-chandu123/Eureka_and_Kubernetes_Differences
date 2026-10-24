# Banking System — V1 Docker + Eureka starter (Bash)

Extract this ZIP into `E:\GIT\Repo-3 for Eureka_and_Kubernetes` without overwriting existing files.

Use Ubuntu (WSL2) for `.sh` scripts. Docker Desktop provides the Docker engine; enable Settings > Resources > WSL Integration for your Ubuntu distribution.

Assumptions: Config Server fetches `config-repo/` from GitHub `main`; MySQL stays on Windows and is reached via `host.docker.internal`. This is a local learning scaffold, not production-hardened. Do not commit database credentials or JWT secrets.

Before running:
1. Back up/commit existing work.
2. Extract without overwriting.
3. Open Ubuntu and run `cd "/mnt/e/GIT/Repo-3 for Eureka_and_Kubernetes"` then `docker info`.
4. Review the Dockerfiles and `compose.v1.yml`.
5. Build: `bash ./scripts/build-v1.sh`
6. Start: `bash ./scripts/start-v1.sh`
7. Stop: `bash ./scripts/stop-v1.sh`

Do not run scripts until we review the configuration assumptions.
