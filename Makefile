.PHONY: help dev prod seed down logs logs-backend logs-frontend shell-backend shell-frontend setup setup-docker

COMPOSE ?= docker compose
PROFILES_DEV = --profile dev
PROFILES_PROD = --profile prod

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Start development environment (hot reload)
	$(COMPOSE) $(PROFILES_DEV) up --build

prod: ## Start production environment
	$(COMPOSE) $(PROFILES_PROD) up --build -d

seed: ## Seed the database
	@echo "Waiting for database to be healthy..."
	@for i in $$(seq 1 30); do \
		$(COMPOSE) $(PROFILES_DEV) exec -T db pg_isready -U $${POSTGRES_USER:-vsc} > /dev/null 2>&1 && break; \
		if [ "$$i" -eq 30 ]; then echo "Database not healthy after 30s"; exit 1; fi; \
		sleep 1; \
	done
	$(COMPOSE) $(PROFILES_DEV) run --rm backend sh -c "bun run prisma:seed"

down: ## Stop all containers
	$(COMPOSE) $(PROFILES_DEV) down
	$(COMPOSE) $(PROFILES_PROD) down

logs: ## View live logs
	$(COMPOSE) $(PROFILES_DEV) logs -f

logs-backend: ## View backend logs
	$(COMPOSE) logs -f backend

logs-frontend: ## View frontend logs
	$(COMPOSE) logs -f frontend

shell-backend: ## Open shell in backend container
	$(COMPOSE) $(PROFILES_DEV) exec backend sh

shell-frontend: ## Open shell in frontend container
	$(COMPOSE) $(PROFILES_DEV) exec frontend sh

setup: ## Check prerequisites (podman/docker, podman-compose/docker compose)
	@echo "Checking prerequisites..."
	@if command -v podman > /dev/null 2>&1; then \
		podman --version; \
	elif command -v docker > /dev/null 2>&1; then \
		docker --version; \
	else \
		echo "ERROR: Docker or Podman not found. Install one first."; exit 1; \
	fi
	@if command -v docker > /dev/null 2>&1 && docker compose version > /dev/null 2>&1; then \
		docker compose version; \
	elif command -v podman-compose > /dev/null 2>&1; then \
		podman-compose --version; \
	else \
		echo "ERROR: Docker Compose or podman-compose not found."; exit 1; \
	fi
	@echo "All prerequisites met."

setup-docker: ## Full setup: verify docker, pull images, start dev
	@$(MAKE) setup
	@$(MAKE) dev
