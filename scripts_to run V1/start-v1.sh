#!/usr/bin/env bash
set -Eeuo pipefail
repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"
docker compose -f compose.v1.yml up -d
docker compose -f compose.v1.yml ps
