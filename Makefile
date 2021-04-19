SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

PROJECT_NAME = sealedmessages
REGISTRY_PORT = 32323

.PHONY: help
help: ## View help information
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

tmp/asdf-installs: .tool-versions ## Install all tools through asdf-vm
	@mkdir -p $(@D)
	@asdf plugin-add ctlptl  || true
	@asdf plugin-add helm    || true
	@asdf plugin-add kind    || true
	@asdf plugin-add kubectl || true
	@asdf plugin-add poetry  || true
	@asdf plugin-add python  || true
	@asdf plugin-add tilt    || true
	@asdf plugin-add yarn    || true
	@asdf plugin-add nodejs  || true
	asdf install
	@touch $@

tmp/k8s-cluster: tmp/asdf-installs ## Create a Kubernetes cluster for local development
	@mkdir -p $(@D)
	@ctlptl get registry $(PROJECT_NAME)-registry || ctlptl create registry $(PROJECT_NAME)-registry --port=32323
	@ctlptl get cluster kind-$(PROJECT_NAME) || ctlptl create cluster kind --name kind-$(PROJECT_NAME) --registry=$(PROJECT_NAME)-registry
	@touch $@

.PHONY: bootstrap
bootstrap: tmp/asdf-installs tmp/k8s-cluster ## Perform all bootstrapping to start your project
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo add traefik https://helm.traefik.io/traefik
	helm repo update # Make sure that tilt can pull the latest helm chart versions

.PHONY: clean
clean: ## Delete local dev environment
	@-ctlptl get cluster kind-$(PROJECT_NAME) && ctlptl delete cluster kind-$(PROJECT_NAME)
	@-ctlptl get registry $(PROJECT_NAME)-registry && ctlptl delete registry $(PROJECT_NAME)-registry
	@rm -rf tmp

.PHONY: up
up: bootstrap ## Run a local development environment
	tilt up --context kind-$(PROJECT_NAME) --hud

.PHONY: down
down: ## Shutdown local development and free those resources
	tilt down --context kind-$(PROJECT_NAME)

.PHONY: psql
psql: ## Opens a psql shell to the local postgres instance
	kubectl --context kind-$(PROJECT_NAME) exec -it postgresql-postgresql-0 -- bash -c "PGPASSWORD=local_password psql -U postgres"
