🍔 GrabFood Mini – Backend System (Monorepo)
📌 Overview
GrabFood Mini is a backend system for a food delivery platform or order at the counter with scanning QR, built using a microservices architecture within a monorepo.
The project focuses on designing scalable, maintainable, and production-oriented services, with an emphasis on backend system design, service communication, and data consistency.

Instead of relying heavily on frameworks, the system is structured using Clean Architecture principles, ensuring clear separation of concerns and long-term scalability.

🏗️ System Architecture
🔹 Microservices (Monorepo)
The backend is organized as a monorepo, where multiple services are developed and managed in a single repository:

Bash

services/

 ├── auth-service
 
 ├── user-service
 
 ├── restaurant-service
 
 ├── order-service
 
Each service is independently deployable and follows a consistent internal structure.

🔹 Clean Architecture (per service)
Each service is designed using layered architecture:

Bash

- domain         # Business entities & core logic
- application    # Use cases (business flows)
- infrastructure # Database, external integrations
- interface      # Controllers, routes, HTTP layer
This ensures:

High maintainability

Testability

Independence from frameworks

🚀 Tech Stack
Bash

Node.js (Express.js)
MongoDB (Mongoose)
JWT Authentication
Docker
🔑 Core Services
🔐 Authentication Service
JWT-based authentication (access token & refresh token)

Login / Register / Logout flows

Token validation & protected routes via middleware

Designed for future OAuth integration (Google login)

👤 User Service
User data management

Structured for role-based extension (RBAC)

Integrated with authentication flow

🍽️ Restaurant Service
Restaurant data management

Designed for future expansion (menu, categories, search, filtering)

⚙️ System Capabilities
RESTful API design across services

Centralized error handling & validation

Modular and scalable service structure

Containerized environment using Docker

Designed to support distributed transactions (Saga Pattern)

Ready for horizontal scaling and service expansion

🔄 Service Communication (Design)
The system is designed with loose coupling between services, allowing:

Independent development & deployment

Future integration with:

API Gateway

Message Queue (Kafka / RabbitMQ)

Event-driven architecture

🐳 Running the System
1. Clone repository
Bash

git clone https://github.com/hoangnm17/grabfood-mini-be.git
cd grabfood-mini-be
2. Start services
Bash

docker-compose up --build
3. Example endpoints
Auth Service: http://localhost:3107

MongoDB: mongodb://localhost:27018

📡 API Sample
Login
http

POST /api/auth/login
JSON

{
  "phone": "0123456789",
  "password": "123456"
}
Access protected resource
http

GET /api/user/profile
Authorization: Bearer <access_token>
📁 Example Service Structure
Bash

auth-service/
 ├── domain
 ├── application
 ├── infrastructure
 ├── interface
 ├── middlewares
 ├── routes
🔮 Roadmap
OAuth (Google Login)

API Gateway

Order & Payment Services

Full Saga Pattern implementation

Message Queue (Kafka / RabbitMQ)

Caching layer (Redis)

Observability (logging, monitoring)

🧠 What This Project Demonstrates
Designing microservices in a monorepo

Applying Clean Architecture in real-world backend systems

Implementing authentication & security (JWT)

Structuring scalable and maintainable backend codebases

Understanding distributed system design concepts

⭐ Notes
This project is actively developed as part of learning and practicing backend system design and scalable architectures.
