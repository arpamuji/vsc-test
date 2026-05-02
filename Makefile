.PHONY: help dev prod seed down logs logs-backend logs-frontend shell-backend shell-frontend setup setup-docker

COMPOSE = docker compose
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

setup: ## Check prerequisites (docker, docker compose)
	@echo "Checking prerequisites..."
	@docker --version || (echo "ERROR: Docker not found. Install Docker first." && exit 1)
	@docker compose version || (echo "ERROR: Docker Compose not found." && exit 1)
	@echo "All prerequisites met."

setup-docker: ## Full setup: verify docker, pull images, start dev
	@$(MAKE) setup
	@$(MAKE) dev
