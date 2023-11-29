#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"
docker run --rm --name comma-api-build -v $(pwd):/app -w /app node:16-alpine sh -c "yarn install --immutable --immutable-cache --check-cache && yarn lint && yarn build && yarn generate"
