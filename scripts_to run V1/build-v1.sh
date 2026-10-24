#!/usr/bin/env bash
set -Eeuo pipefail
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
echo "Building Maven reactor (tests skipped for initial image build)..."
mvn -B -DskipTests package
echo "Building V1 Docker images..."
docker compose -f compose.v1.yml build
echo "V1 image build completed. Containers have not been started."
