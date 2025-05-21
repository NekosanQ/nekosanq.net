dev:
	docker compose --env-file .env.dev up --build

prod:
	docker compose --env-file .env.prod up --build
