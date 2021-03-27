SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

PROJECT_NAME = sealedmessages

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

tmp/asdf-installs: .tool-versions ## Install all tools through asdf-vm
	@-mkdir -p $(@D)
	@-asdf plugin-add helm    || true
	@-asdf plugin-add kind    || true
	@-asdf plugin-add kubectl || true
	@-asdf plugin-add poetry  || true
	@-asdf plugin-add python  || true
	@-asdf plugin-add tilt    || true
	@-asdf plugin-add yarn    || true
	@-asdf plugin-add nodejs  || true
	asdf install
	@-touch $@

tmp/k8s-cluster: tmp/asdf-installs ## Create a Kubernetes cluster for local development
	@-mkdir -p $(@D)
	@-kind create cluster --name $(PROJECT_NAME)
	@-touch $@

.PHONY: bootstrap
bootstrap: tmp/asdf-installs tmp/k8s-cluster ## Perform all bootstrapping to start your project
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo add traefik https://helm.traefik.io/traefik
	helm repo update # Make sure that tilt can pull the latest helm chart versions

.PHONY: clean
clean: ## Delete local dev environment
	@-rm -rf tmp
	@-kind delete cluster --name $(PROJECT_NAME)

.PHONY: up
up: bootstrap ## Run a local development environment
	tilt up --context kind-$(PROJECT_NAME) --hud
	tilt down --context kind-$(PROJECT_NAME)

.PHONY: psql
psql: ## Opens a psql shell to the local postgres instance
	kubectl --context kind-$(PROJECT_NAME) exec -it postgresql-postgresql-0 -- bash -c "PGPASSWORD=local_password psql -U postgres"

.PHONY: redis-cli
redis-cli: ## Opens a redis-cli shell
	kubectl --context kind-$(PROJECT_NAME) exec -it redis-master-0 -c redis -- redis-cli
