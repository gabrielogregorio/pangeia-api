.PHONY: dev

d: dev
log: logs
la: logs-api

dev: 
	make stop
	docker compose -f ./docker-compose.yaml up -d

build: 
	make stop
	@docker compose -f ./docker-compose.yaml up --build --force-recreate

down:
	@docker compose -f ./docker-compose.yaml down --remove-orphans --volumes

stop:
	@docker compose -f ./docker-compose.yaml stop

bash:
	@docker exec -it yggdrasil /bin/bash

logs:
	@docker compose -f ./docker-compose.yaml logs -f

logs-api:
	@docker compose -f ./docker-compose.yaml logs -f yggdrasil
