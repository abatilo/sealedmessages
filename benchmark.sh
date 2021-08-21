#!/bin/bash
set -e

# Start fresh
docker system prune -af

# We're not interested in timing how long it takes to pull the image
docker pull nginx:1.19-alpine
docker pull node:14.16.0-alpine
docker pull python:3.9-slim

echo "⇒ time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile.backend backend"
time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile.backend backend
echo

echo "⇒ time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile.backend backend"
time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile.backend backend
echo

echo "⇒ time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile.frontend frontend"
time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile.frontend frontend
echo

echo "⇒ time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile.frontend frontend"
time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile.frontend frontend
echo

echo "⇒  time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile ."
time DOCKER_BUILDKIT=0 docker build -q --no-cache -f ./operations/Dockerfile .
echo

echo "⇒  time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile ."
time DOCKER_BUILDKIT=1 docker build -q --no-cache -f ./operations/Dockerfile .
echo
