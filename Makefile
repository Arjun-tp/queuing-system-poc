
# Run ESLint to fix formatting issues
lint-backend:
	@echo "Linting code..."
	npx eslint --config backend/eslint.config.js "backend/**/*.js" --fix && npx prettier --write "backend/**/*.js"

# Run backend
start-backend:
	@echo "Starting backend services..."
	cd backend && nodemon server.js

# Run frontend
start-web:
	@echo "Starting frontend services..."
	cd web && npm run dev

# starts service
service:
	@echo "Docker Composing..."
	docker compose up --build

# builds service
service-build:
	@echo "Building docker containers..."
	docker compose build

# stops service
service-stop:
	@echo "Killing docker containers..."
	docker compose down

# start tests
test:
	@echo "Starting tests..."
	cd backend && npm run test