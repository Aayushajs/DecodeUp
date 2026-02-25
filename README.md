# DecodeUp E-commerce Platform Documentation

## Project Overview
This project is a comprehensive full-stack e-commerce solution designed with an editorial aesthetic. It comprises a decoupled frontend and two distinct backend implementations tailored for different stages of the development lifecycle. The primary goal is to provide a premium user experience while maintaining a robust and scalable infrastructure.

---

## Project Visuals

### Desktop Experience
<img src="docs/screenshots/hero_section.jpg" width="800" alt="Hero Section" />
*Editorial Hero Section with dynamic randomized stats.*

<img src="docs/screenshots/desktop_grid.png" width="800" alt="Desktop Grid" />
*Clean product discovery grid with hover interactions.*

### Mobile Experience
<img src="docs/screenshots/mobile_view.png" width="300" alt="Mobile View" />
*Fully responsive mobile layout optimized for shopping on the go.*

---

## Technical Stack

### Frontend
- Framework: React 19
- Build Tool: Vite
- State Management: Redux Toolkit (RTK Query)
- Navigation: React Router DOM v7
- Icons: Lucide React
- Styling: Modern CSS with Design Tokens and Glassmorphism effects

### Backend Development (backend_dev)
- Framework: NestJS
- ORM: TypeORM
- Purpose: Optimized for local development, rapid prototyping, and iterative feature building.
- Database Support: PostgreSQL

### Backend Production (backend_production)
- Framework: NestJS
- ORM: Prisma
- Purpose: Built for production stability, high performance, and schema safety.
- Database Support: PostgreSQL

---

## Architecture and Repository Structure

The project is organized as a monorepo-style structure to ensure clear separation of concerns:

- /frontend: Contains the React application, styling, and client-side logic. [View Frontend README](./frontend/README.md)
- /backend_dev: The development-focused backend server implementation. [View Dev Backend README](./backend_dev/README.md)
- /backend_production: The production-ready backend server implementation. [View Production Backend README](./backend_production/README.md)

### Why there are two backends
The dual-backend strategy allows for maximum flexibility. The development backend (backend_dev) utilizes TypeORM for its ease of use during high-velocity development phases. The production backend (backend_production) utilizes Prisma to provide stricter type safety at the database layer and more predictable migration paths, which is essential for maintaining production environments.

---

## System Requirements
- Node.js (Version 18.0.0 or higher)
- npm (Version 9.0.0 or higher)
- PostgreSQL (A running instance for data persistence)

---

## Installation and Setup Instructions

### 1. Database Configuration
Before starting any backend, ensure you have a PostgreSQL database created. You will need the connection string or credentials (host, port, username, password, and database name).

### 2. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```
Configure environment variables by searching for or creating .env files:
- .env.development: Set VITE_API_URL=http://localhost:5000
- .env.production: Set VITE_API_URL=http://localhost:3000

Start the development server:
```bash
npm run dev
```
The application will be accessible at http://localhost:5173.

### 3. Backend Development Setup (TypeORM)
Navigate to the backend_dev directory and install dependencies:
```bash
cd backend_dev
npm install
```
Configure the .env file with your database credentials:
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE

Start the server:
```bash
npm start
```
The server defaults to port 5000.

### 4. Backend Production Setup (Prisma)
Navigate to the backend_production directory and install dependencies:
```bash
cd backend_production
npm install
```
Configure the .env file with your DATABASE_URL:
- DATABASE_URL="postgresql://user:password@host:port/database"

Generate the Prisma client:
```bash
npx prisma generate
```
Start the server:
```bash
npm start
```
The server defaults to port 3000.

---

## Environment Variable Reference

### Frontend Variables
- VITE_API_URL: The base URL for the backend API.

### Backend Variables
- DATABASE_URL / DB_HOST: Connection details for the PostgreSQL instance.
- PORT: The port number on which the server will listen.

---

## Product Management API
The backend provides endpoints for managing products and the shopping cart.

- GET /products: Retrieve the full list of products.
- POST /products: Create a new product (requires name, price, and image URL).
- GET /cart: Retrieve the current state of the shopping cart.
- POST /cart: Add an item or increment quantity in the cart.
- DELETE /cart/:id: Remove an item from the cart.

---

## Support and Contact Information
For technical support, reporting bugs, or any clarifications regarding the project structure and setup, please contact the administrator.

Contact Email: aayushj004@gmail.com

---
Copyright 2026 DecodeUp Platform. All rights reserved.
