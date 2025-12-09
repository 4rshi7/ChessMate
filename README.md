# ChessMate


**ChessMate** is a scalable, end-to-end multiplayer online chess platform built with a high-performance microservices architecture. It features real-time PvP gameplay, secure authentication, and an event-driven backend designed to handle high concurrency.

---

## Features

* **Real-Time Gameplay:** Seamless PvP experience powered by WebSockets and optimized with Redis for ultra-low latency.
* **Smart Matchmaking:** Queue-based pairing system to find opponents based on rating and availability.
* **Event-Driven Architecture:** Decoupled services communicating via RabbitMQ/Kafka ensures data integrity and system resilience.
* **Secure Authentication:** OAuth (Passport.js) and JWT-based stateless authentication protected by an API Gateway.
* **User Profiles:** Detailed statistics, game history, and ELO rating tracking.
* **Game Analysis:** (Beta) Review past games with move-by-move navigation.
* **Containerized:** Fully Dockerized environment for consistent deployment and easy scaling.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React, TypeScript, Tailwind CSS, Zustand (State), Socket.io-client |
| **Backend** | Node.js, Express, Microservices Pattern |
| **Databases** | PostgreSQL (Game Archives), Redis (Active Game State) |
| **Messaging** | RabbitMQ|
| **DevOps** | Docker, Docker Compose, Nginx (API Gateway) |
| **Auth** | Passport.js (OAuth), JWT |

---

## Design Document

https://docs.google.com/document/d/1pHCMG0WR4HGZa0zPp93DYYTaapyVt2P01CNbuj8d0d4/edit?usp=sharing

