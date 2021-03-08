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
	@-asdf plugin-add helm    || asdf install helm
	@-asdf plugin-add kind    || asdf install kind
	@-asdf plugin-add kubectl || asdf install kubectl
	@-asdf plugin-add poetry  || asdf install poetry
	@-asdf plugin-add python  || asdf install python
	@-asdf plugin-add tilt    || asdf install tilt
	@-touch $@

tmp/k8s-cluster: tmp/asdf-installs ## Create a Kubernetes cluster for local development
	@-mkdir -p $(@D)
	@-kind create cluster --name $(PROJECT_NAME)
	@-touch $@

.PHONY: bootstrap
bootstrap: tmp/asdf-installs tmp/k8s-cluster ## Perform all bootstrapping to start your project

.PHONY: clean
clean: ## Delete local dev environment
	@-rm -rf tmp
	@-kind delete cluster --name $(PROJECT_NAME)

.PHONY: up
up: bootstrap ## Run a local development environment
	tilt up --context kind-$(PROJECT_NAME) --hud
	tilt down --context kind-$(PROJECT_NAME)
