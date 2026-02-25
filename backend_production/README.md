# Shopping Cart Backend API

A production-ready shopping cart backend API built with **NestJS**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. This project follows industry-standard modular architecture, strong typing, DTO-based validation, centralized configuration, standardized API responses, and clean code best practices.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Environment Variables](#environment-variables)
6. [Database Schema](#database-schema)
7. [Database Seeding](#database-seeding)
8. [API Endpoints](#api-endpoints)
9. [API Response Format](#api-response-format)
10. [API Details with Examples](#api-details-with-examples)
11. [Error Handling](#error-handling)
12. [DTOs and Validation](#dtos-and-validation)
13. [TypeScript Interfaces and Entities](#typescript-interfaces-and-entities)
14. [Architecture Overview](#architecture-overview)
15. [Module Breakdown](#module-breakdown)
16. [Global Middleware and Interceptors](#global-middleware-and-interceptors)
17. [Centralized Configuration](#centralized-configuration)
18. [Available Scripts](#available-scripts)
19. [Testing with Postman](#testing-with-postman)
20. [Key Design Decisions](#key-design-decisions)
21. [Performance Considerations](#performance-considerations)

---

## Tech Stack

| Technology             | Version  | Purpose                                        |
| ---------------------- | -------- | ---------------------------------------------- |
| **NestJS**             | v11.x    | Node.js backend framework (modular, scalable)  |
| **TypeScript**         | v5.x     | Strong typing across the entire codebase       |
| **PostgreSQL**         | Latest   | Relational database for products and cart data  |
| **Prisma ORM**         | v6.x     | Schema-first ORM for database access           |
| **class-validator**    | v0.14.x  | DTO request validation with decorators         |
| **class-transformer**  | v0.5.x   | Request data transformation (type coercion)    |
| **Morgan**             | v1.10.x  | HTTP request logging in dev format             |
| **RxJS**               | v7.x     | Reactive programming for interceptors          |
| **dotenv**             | v17.x    | Environment variable management                |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma                          # Database schema definition
│   ├── seed.ts                                # Database seeding script (8 products)
│   └── migrations/                            # Auto-generated migration files
│
├── src/
│   ├── config/
│   │   └── app.config.ts                      # Centralized app configuration
│   │
│   ├── common/
│   │   ├── constants/
│   │   │   ├── messages.constant.ts           # All API message strings
│   │   │   └── index.ts                       # Barrel export
│   │   ├── decorators/                        # Custom decorators (extensible)
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts       # Global error response handler
│   │   ├── guards/                            # Custom guards (extensible)
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts         # Morgan-style request/response logger
│   │   │   └── transform.interceptor.ts       # Standard success response wrapper
│   │   ├── interfaces/
│   │   │   ├── api-response.interface.ts      # ApiResponse<T> & ApiErrorResponse types
│   │   │   └── index.ts                       # Barrel export
│   │   └── pipes/                             # Custom validation pipes (extensible)
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts                   # Global database module
│   │   └── prisma.service.ts                  # PrismaClient lifecycle service
│   │
│   ├── products/
│   │   ├── dto/
│   │   │   └── product-response.dto.ts        # Product response shape
│   │   ├── entities/
│   │   │   └── product.entity.ts              # Product TypeScript interface
│   │   ├── products.controller.ts             # Route handlers
│   │   ├── products.module.ts                 # Feature module definition
│   │   └── products.service.ts                # Business logic layer
│   │
│   ├── cart/
│   │   ├── dto/
│   │   │   ├── add-to-cart.dto.ts             # Request validation DTO
│   │   │   └── cart-response.dto.ts           # Cart response shape
│   │   ├── entities/
│   │   │   └── cart-item.entity.ts            # CartItem & CartResponse interfaces
│   │   ├── cart.controller.ts                 # Route handlers
│   │   ├── cart.module.ts                     # Feature module definition
│   │   └── cart.service.ts                    # Business logic layer
│   │
│   ├── app.module.ts                          # Root application module
│   └── main.ts                                # Application bootstrap entry point
│
├── test/                                      # E2E and unit test files
├── .env                                       # Environment variables (not committed)
├── .env.example                               # Environment template (committed)
├── .gitignore                                 # Git ignore rules
├── package.json                               # Dependencies, scripts, metadata
├── tsconfig.json                              # TypeScript compiler configuration
├── tsconfig.build.json                        # TypeScript build configuration
├── Shopping_Cart_API.postman_collection.json   # Postman collection for API testing
└── README.md                                  # This documentation file
```

---

## Prerequisites

Before setting up this project, ensure you have the following installed on your machine:

- **Node.js** - Version 18 or higher (download from https://nodejs.org)
- **npm** - Comes bundled with Node.js
- **PostgreSQL** - Version 12 or higher, installed and running (download from https://www.postgresql.org)
- **Git** - For version control (optional but recommended)

To verify your installations, run:

```bash
node --version    # Should output v18.x.x or higher
npm --version     # Should output 8.x.x or higher
psql --version    # Should output psql 12.x or higher
```

---

## Setup Instructions

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`, including NestJS core, Prisma, class-validator, Morgan, and all dev dependencies.

### Step 3: Configure Environment Variables

Copy the example environment file and update it with your PostgreSQL credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/shopping_cart?schema=public"
PORT=3000
```

**Important:** Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual PostgreSQL credentials. The database name `shopping_cart` will be created automatically during migration.

### Step 4: Create the Database

Open PostgreSQL and create the database if it does not already exist:

```sql
CREATE DATABASE shopping_cart;
```

Or via the terminal:

```bash
psql -U YOUR_USERNAME -c "CREATE DATABASE shopping_cart;"
```

### Step 5: Run Database Migration

```bash
npx prisma migrate dev --name init
```

This command will:
- Read the `prisma/schema.prisma` file
- Generate SQL migration files in `prisma/migrations/`
- Execute the migration against your PostgreSQL database
- Create the `products` and `cart_items` tables
- Auto-generate the Prisma Client TypeScript types

### Step 6: Generate Prisma Client

If you skipped migration or need to regenerate the client:

```bash
npx prisma generate
```

This generates the type-safe Prisma Client in `node_modules/.prisma/client/`.

### Step 7: Seed the Database

```bash
npx prisma db seed
```

This runs the `prisma/seed.ts` script which:
- Clears any existing cart items and products
- Inserts 8 sample products with realistic names, prices, and image URLs

### Step 8: Start the Development Server

```bash
npm run start:dev
```

The server starts with hot-reload enabled. You will see output like:

```
[NestFactory] Starting Nest application...
[InstanceLoader] PrismaModule dependencies initialized
[InstanceLoader] ProductsModule dependencies initialized
[InstanceLoader] CartModule dependencies initialized
[RoutesResolver] ProductsController {/products}
[RouterExplorer] Mapped {/products, GET} route
[RouterExplorer] Mapped {/products/:id, DELETE} route
[RoutesResolver] CartController {/cart}
[RouterExplorer] Mapped {/cart, GET} route
[RouterExplorer] Mapped {/cart, POST} route
[RouterExplorer] Mapped {/cart/:id, DELETE} route
[Bootstrap] Server is running on http://localhost:3000
```

### Step 9: Start in Production Mode (Optional)

```bash
npm run build
npm run start:prod
```

---

## Environment Variables

| Variable       | Required | Default | Description                                    |
| -------------- | -------- | ------- | ---------------------------------------------- |
| `DATABASE_URL` | Yes      | -       | PostgreSQL connection string                   |
| `PORT`         | No       | 3000    | Server port number                             |

### DATABASE_URL Format

```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?schema=SCHEMA_NAME
```

| Part            | Example          | Description                        |
| --------------- | ---------------- | ---------------------------------- |
| `USERNAME`      | postgres         | PostgreSQL username                |
| `PASSWORD`      | mypassword       | PostgreSQL password                |
| `HOST`          | localhost        | Database server hostname           |
| `PORT`          | 5432             | PostgreSQL port (default: 5432)    |
| `DATABASE_NAME` | shopping_cart    | Name of the database               |
| `SCHEMA_NAME`   | public           | PostgreSQL schema (default: public)|

---

## Database Schema

The database consists of two tables with a one-to-many relationship.

### Entity Relationship

```
Product (1) -----> (*) CartItem
  id                     id
  name                   productId (FK -> Product.id)
  price                  quantity
  image
```

### Products Table (`products`)

| Column  | Type      | Constraints                        | Description              |
| ------- | --------- | ---------------------------------- | ------------------------ |
| `id`    | Integer   | PRIMARY KEY, AUTO INCREMENT        | Unique product identifier|
| `name`  | String    | NOT NULL                           | Product display name     |
| `price` | Float     | NOT NULL                           | Product price in USD     |
| `image` | String    | NOT NULL                           | Product image URL        |

### Cart Items Table (`cart_items`)

| Column      | Type    | Constraints                                     | Description                |
| ----------- | ------- | ----------------------------------------------- | -------------------------- |
| `id`        | Integer | PRIMARY KEY, AUTO INCREMENT                     | Unique cart item identifier|
| `productId` | Integer | FOREIGN KEY -> products.id, UNIQUE, NOT NULL    | Reference to product       |
| `quantity`  | Integer | NOT NULL, DEFAULT 1                             | Quantity of product in cart |

### Schema Constraints

- **Unique Constraint** on `productId` in `cart_items` - Ensures only one cart entry per product. When the same product is added again, the quantity is incremented instead of creating a duplicate row.
- **Cascade Delete** - When a product is deleted from the `products` table, all associated entries in `cart_items` are automatically removed. This is defined via `onDelete: Cascade` in the Prisma schema.
- **Foreign Key** - `productId` in `cart_items` references `id` in `products`, maintaining referential integrity.

### Prisma Schema Definition

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id        Int        @id @default(autoincrement())
  name      String
  price     Float
  image     String
  cartItems CartItem[]

  @@map("products")
}

model CartItem {
  id        Int     @id @default(autoincrement())
  productId Int
  quantity  Int     @default(1)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([productId])
  @@map("cart_items")
}
```

---

## Database Seeding

The seed script (`prisma/seed.ts`) populates the database with 8 sample products:

| # | Product Name                   | Price    | Image Source  |
| - | ------------------------------ | -------- | ------------- |
| 1 | Wireless Bluetooth Headphones  | $59.99   | Unsplash      |
| 2 | Smart Watch Pro                | $199.99  | Unsplash      |
| 3 | Running Shoes                  | $89.99   | Unsplash      |
| 4 | Laptop Backpack                | $49.99   | Unsplash      |
| 5 | Mechanical Keyboard            | $129.99  | Unsplash      |
| 6 | USB-C Hub Adapter              | $34.99   | Unsplash      |
| 7 | Portable Speaker               | $44.99   | Unsplash      |
| 8 | Gaming Mouse                   | $69.99   | Unsplash      |

The seed script is idempotent - it clears existing data before inserting, so it can be run multiple times safely.

To run the seed:

```bash
npx prisma db seed
```

---

## API Endpoints

### Summary Table

| Method   | Endpoint          | Description                                          | Status Codes      |
| -------- | ----------------- | ---------------------------------------------------- | ----------------- |
| `GET`    | `/products`       | Returns list of all products from PostgreSQL         | 200               |
| `DELETE` | `/products/:id`   | Deletes a product by ID (cascade deletes cart items) | 200, 404          |
| `GET`    | `/cart`           | Returns cart items with total count and total price   | 200               |
| `POST`   | `/cart`           | Adds an item to cart (insert new or update quantity) | 201, 400, 404     |
| `DELETE` | `/cart/:id`       | Removes an item from the cart by cart item ID        | 200, 404          |

---

## API Response Format

Every API response follows a consistent, standardized format.

### Success Response Structure

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": { },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

| Field        | Type              | Description                              |
| ------------ | ----------------- | ---------------------------------------- |
| `success`    | boolean           | Always `true` for successful requests    |
| `statusCode` | number            | HTTP status code                         |
| `message`    | string            | Human-readable success message           |
| `data`       | object or array   | The actual response payload              |
| `timestamp`  | string (ISO 8601) | Server timestamp of the response         |

### Error Response Structure

```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["productId must be a positive number"],
  "path": "/cart",
  "method": "POST",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

| Field        | Type              | Description                              |
| ------------ | ----------------- | ---------------------------------------- |
| `success`    | boolean           | Always `false` for error responses       |
| `statusCode` | number            | HTTP status code                         |
| `error`      | string            | Error category (e.g., "Bad Request")     |
| `message`    | string or array   | Detailed error description(s)            |
| `path`       | string            | Request URL path                         |
| `method`     | string            | HTTP method (GET, POST, DELETE, etc.)    |
| `timestamp`  | string (ISO 8601) | Server timestamp of the error            |

---

## API Details with Examples

### 1. GET /products

Fetches all products from the PostgreSQL database. Returns products sorted by insertion order with id, name, price, and image fields.

**Request:**
```
GET http://localhost:3000/products
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "price": 59.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
      "id": 2,
      "name": "Smart Watch Pro",
      "price": 199.99,
      "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
      "id": 3,
      "name": "Running Shoes",
      "price": 89.99,
      "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    }
  ],
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

---

### 2. GET /cart

Fetches all items currently in the shopping cart. Each cart item includes the full product details (name, price, image). Also calculates and returns the total number of items and total price across all cart items.

**Request:**
```
GET http://localhost:3000/cart
```

**Response (200 OK) - Cart with items:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Wireless Bluetooth Headphones",
          "price": 59.99,
          "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        }
      },
      {
        "id": 2,
        "productId": 3,
        "quantity": 1,
        "product": {
          "id": 3,
          "name": "Running Shoes",
          "price": 89.99,
          "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
        }
      }
    ],
    "totalItems": 3,
    "totalPrice": 209.97
  },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

**Response (200 OK) - Empty cart:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

**Total Calculation Logic:**
- `totalItems` = Sum of `quantity` across all cart items
- `totalPrice` = Sum of (`product.price` * `quantity`) for each item, rounded to 2 decimal places

---

### 3. POST /cart

Adds a product to the shopping cart. Uses an **upsert pattern**: if the product already exists in the cart, the quantity is incremented by the specified amount. If the product is not in the cart, a new cart item is created.

**Request:**
```
POST http://localhost:3000/cart
Content-Type: application/json
```

**Request Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

| Field       | Type    | Required | Default | Validation                              |
| ----------- | ------- | -------- | ------- | --------------------------------------- |
| `productId` | integer | Yes      | -       | Must be a positive integer              |
| `quantity`  | integer | No       | 1       | Must be an integer >= 1                 |

**Response (201 Created):**

Returns the complete updated cart (same format as GET /cart response):

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Request successful",
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "quantity": 2,
        "product": {
          "id": 1,
          "name": "Wireless Bluetooth Headphones",
          "price": 59.99,
          "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
        }
      }
    ],
    "totalItems": 2,
    "totalPrice": 119.98
  },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

**Behavior when product already in cart:**

If you send `POST /cart` with `{ "productId": 1, "quantity": 3 }` and product 1 is already in the cart with quantity 2, the resulting quantity will be 5 (2 + 3).

**Error Responses:**

Product not found (404):
```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Product with ID 999 not found",
  "path": "/cart",
  "method": "POST",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

Validation error - missing productId (400):
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    "productId must be a positive number",
    "productId must be an integer"
  ],
  "path": "/cart",
  "method": "POST",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

Validation error - negative quantity (400):
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["quantity must be at least 1"],
  "path": "/cart",
  "method": "POST",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

Validation error - extra unknown fields (400):
```json
{
  "success": false,
  "statusCode": 400,
  "error": "Bad Request",
  "message": ["property discount should not exist"],
  "path": "/cart",
  "method": "POST",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

---

### 4. DELETE /cart/:id

Removes a specific item from the shopping cart using the cart item's ID (not the product ID). After removal, the response returns the updated cart with recalculated totals.

**Request:**
```
DELETE http://localhost:3000/cart/1
```

**Response (200 OK):**

Returns the updated cart after removal:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

**Error Response - Cart item not found (404):**
```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Cart item with ID 999 not found",
  "path": "/cart/999",
  "method": "DELETE",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

---

### 5. DELETE /products/:id

Deletes a product from the database by its ID. Because of the cascade delete relationship, if this product is in any cart, the associated cart item is also automatically removed.

**Request:**
```
DELETE http://localhost:3000/products/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "id": 1,
    "name": "Wireless Bluetooth Headphones",
    "price": 59.99,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

**Error Response - Product not found (404):**
```json
{
  "success": false,
  "statusCode": 404,
  "error": "Not Found",
  "message": "Product with ID 999 not found",
  "path": "/products/999",
  "method": "DELETE",
  "timestamp": "2026-02-25T06:00:00.000Z"
}
```

---

## Error Handling

The application uses a **Global Exception Filter** (`HttpExceptionFilter`) that catches all exceptions and formats them into a consistent error response structure. This ensures the frontend always receives predictable error shapes regardless of where the error originates.

### Error Status Codes

| Status Code | Error Type                | When It Occurs                                              |
| ----------- | ------------------------- | ----------------------------------------------------------- |
| `400`       | Bad Request               | Request body fails DTO validation                           |
| `400`       | Bad Request               | Request contains unknown/extra fields (forbidNonWhitelisted)|
| `400`       | Bad Request               | Invalid data types in request body                          |
| `404`       | Not Found                 | Product with given ID does not exist                        |
| `404`       | Not Found                 | Cart item with given ID does not exist                      |
| `500`       | Internal Server Error     | Unexpected server-side errors (database, runtime, etc.)     |

### How the Exception Filter Works

1. The `@Catch()` decorator on `HttpExceptionFilter` catches ALL exceptions globally
2. If the exception is an `HttpException` (NestJS built-in), it extracts the status, message, and error details
3. If the exception is an unknown error (runtime crash, database error), it returns a generic 500 Internal Server Error
4. Every error is logged to the terminal via `Logger.error()`
5. The response is formatted as a standardized `ApiErrorResponse` object

### Validation Error Messages

The `ValidationPipe` is configured with these options:
- **whitelist: true** - Strips any properties not defined in the DTO
- **forbidNonWhitelisted: true** - Throws a 400 error if unknown properties are sent
- **transform: true** - Automatically transforms request payload to DTO class instances
- **enableImplicitConversion: true** - Converts string numbers to actual numbers automatically

---

## DTOs and Validation

DTOs (Data Transfer Objects) define the shape of data exchanged between client and server. All DTOs are validated using `class-validator` decorators.

### AddToCartDto (Request Body for POST /cart)

```typescript
export class AddToCartDto {
    @IsInt({ message: 'productId must be an integer' })
    @IsPositive({ message: 'productId must be a positive number' })
    productId: number;

    @IsOptional()
    @IsInt({ message: 'quantity must be an integer' })
    @Min(1, { message: 'quantity must be at least 1' })
    quantity?: number = 1;
}
```

| Field       | Decorators                      | Rules                                  |
| ----------- | ------------------------------- | -------------------------------------- |
| `productId` | `@IsInt`, `@IsPositive`         | Required, must be a positive integer   |
| `quantity`  | `@IsOptional`, `@IsInt`, `@Min` | Optional, integer >= 1, defaults to 1  |

### ProductResponseDto (Response Shape for Product)

```typescript
export class ProductResponseDto {
    id: number;
    name: string;
    price: number;
    image: string;
}
```

### CartItemResponseDto (Response Shape for Cart Item)

```typescript
export class CartItemResponseDto {
    id: number;
    productId: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
    };
}
```

### CartResponseDto (Response Shape for Full Cart)

```typescript
export class CartResponseDto {
    items: CartItemResponseDto[];
    totalItems: number;
    totalPrice: number;
}
```

---

## TypeScript Interfaces and Entities

Strong typing is enforced via TypeScript interfaces used throughout the application.

### Product Entity

```typescript
// src/products/entities/product.entity.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}
```

### CartItem Entity

```typescript
// src/cart/entities/cart-item.entity.ts
export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: Product;
}
```

### CartResponse Entity

```typescript
// src/cart/entities/cart-item.entity.ts
export interface CartResponse {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}
```

### API Response Interfaces (Shared)

```typescript
// src/common/interfaces/api-response.interface.ts
export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: boolean;
    statusCode: number;
    error: string;
    message: string | string[];
    path: string;
    method: string;
    timestamp: string;
}
```

---

## Architecture Overview

The application follows NestJS's **modular architecture** pattern, where each feature is encapsulated in its own module with dedicated controllers, services, DTOs, and entities.

### Request Lifecycle

```
Client Request
     |
     v
[Morgan Middleware] --> Logs: "POST /cart Body: {productId: 1, quantity: 2}"
     |
     v
[ValidationPipe] --> Validates request body against DTO decorators
     |                 (Rejects with 400 if invalid)
     v
[LoggingInterceptor] --> Logs incoming request details
     |
     v
[Controller] --> Routes request to correct handler method
     |
     v
[Service] --> Executes business logic using PrismaService
     |
     v
[PrismaService] --> Queries PostgreSQL database
     |
     v
[TransformInterceptor] --> Wraps response in {success, data, timestamp}
     |
     v
[LoggingInterceptor] --> Logs: "<-- POST /cart 201 45ms"
     |
     v
Client Response
```

### Error Lifecycle

```
Client Request
     |
     v
[Middleware/Pipe/Service throws exception]
     |
     v
[HttpExceptionFilter] --> Catches ALL exceptions
     |                      Formats into {success: false, error, message, path}
     |                      Logs error to terminal
     v
Client Error Response
```

---

## Module Breakdown

### AppModule (Root)

The root module imports all feature modules. It has no controllers or providers of its own.

```typescript
@Module({
  imports: [PrismaModule, ProductsModule, CartModule],
})
export class AppModule {}
```

### PrismaModule (Database)

A **global module** that provides `PrismaService` to the entire application. Only needs to be imported once in `AppModule`.

- **PrismaService** extends `PrismaClient` directly
- Implements `OnModuleInit` to connect to the database when the application starts
- Implements `OnModuleDestroy` to disconnect when the application shuts down
- Exposes all Prisma model methods (e.g., `this.prisma.product.findMany()`)

### ProductsModule (Feature)

Handles all product-related operations.

- **ProductsController** - Defines two route handlers:
  - `GET /products` - Calls `productsService.findAll()`
  - `DELETE /products/:id` - Calls `productsService.remove(id)` with `ParseIntPipe` for parameter validation
- **ProductsService** - Business logic:
  - `findAll()` - Fetches all products with selected fields (id, name, price, image)
  - `remove(id)` - Validates product exists, deletes it, returns the deleted product data

### CartModule (Feature)

Handles all shopping cart operations.

- **CartController** - Defines three route handlers:
  - `GET /cart` - Calls `cartService.getCart()`
  - `POST /cart` - Calls `cartService.addToCart(dto)` with validated DTO body
  - `DELETE /cart/:id` - Calls `cartService.removeFromCart(id)` with `ParseIntPipe`
- **CartService** - Business logic:
  - `getCart()` - Fetches all cart items with product details, calculates totalItems and totalPrice
  - `addToCart(dto)` - Validates product exists, uses upsert pattern (update quantity if exists, create if new)
  - `removeFromCart(id)` - Validates cart item exists, deletes it, returns updated cart

---

## Global Middleware and Interceptors

### 1. Morgan HTTP Logger

Logs every HTTP request to the terminal in Morgan's "dev" format. Applied as Express middleware in `main.ts`.

**Terminal Output Example:**
```
[Bootstrap] GET /products 200 12.345 ms - 528
[Bootstrap] POST /cart 201 45.678 ms - 312
[Bootstrap] DELETE /cart/1 200 23.456 ms - 153
[Bootstrap] POST /cart 400 5.123 ms - 176
```

### 2. LoggingInterceptor

A NestJS interceptor that provides Morgan-style logging with additional detail. Wraps every request and logs:

- **Incoming request:** Method, URL, and request body (if present)
- **Outgoing response:** Method, URL, status code (color-coded), and response time in milliseconds

**Terminal Output Example:**
```
[HTTP] --> POST /cart Body: {"productId":1,"quantity":2}
[HTTP] <-- POST /cart 201 45ms
[HTTP] --> GET /products
[HTTP] <-- GET /products 200 12ms
```

### 3. TransformInterceptor

Automatically wraps all successful responses in the standardized success envelope:

```json
{
  "success": true,
  "statusCode": <status>,
  "message": "Request successful",
  "data": <original response>,
  "timestamp": "<ISO timestamp>"
}
```

### 4. HttpExceptionFilter

Catches all exceptions (both `HttpException` and unexpected errors) and formats them into the standardized error envelope. Logs every error to the terminal.

---

## Centralized Configuration

### App Config (`src/config/app.config.ts`)

All application configuration constants are centralized in one file:

```typescript
export const APP_CONFIG = {
  DEFAULT_PORT: 3000,
  API_PREFIX: '',
  CORS: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
  VALIDATION: {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  },
} as const;
```

### API Messages (`src/common/constants/messages.constant.ts`)

All user-facing messages are centralized to avoid hardcoded strings:

```typescript
export const API_MESSAGES = {
  REQUEST_SUCCESSFUL: 'Request successful',
  PRODUCT_NOT_FOUND: (id: number) => `Product with ID ${id} not found`,
  CART_ITEM_NOT_FOUND: (id: number) => `Cart item with ID ${id} not found`,
  QUANTITY_MIN: 'Quantity must be at least 1',
  INTERNAL_SERVER_ERROR: 'Internal server error',
} as const;
```

---

## Available Scripts

| Script                   | Command                    | Description                                    |
| ------------------------ | -------------------------- | ---------------------------------------------- |
| `npm run start`          | `nest start`               | Start the server (compiled JS)                 |
| `npm run start:dev`      | `nest start --watch`       | Start with hot-reload (development)            |
| `npm run start:debug`    | `nest start --debug --watch`| Start with debugger attached                  |
| `npm run start:prod`     | `node dist/main`           | Start production server from built files       |
| `npm run build`          | `nest build`               | Compile TypeScript to JavaScript (dist/)       |
| `npm run lint`           | `eslint "{src,test}/**/*.ts" --fix` | Lint and auto-fix TypeScript files   |
| `npm run format`         | `prettier --write "src/**/*.ts"` | Format all TypeScript files with Prettier|
| `npm run test`           | `jest`                     | Run unit tests                                 |
| `npm run test:watch`     | `jest --watch`             | Run tests in watch mode                        |
| `npm run test:cov`       | `jest --coverage`          | Run tests with coverage report                 |
| `npm run test:e2e`       | `jest --config ./test/jest-e2e.json` | Run end-to-end tests              |
| `npm run prisma:migrate` | `npx prisma migrate dev`  | Create and apply database migrations           |
| `npm run prisma:generate`| `npx prisma generate`     | Regenerate Prisma Client                       |
| `npm run prisma:seed`    | `npx prisma db seed`      | Seed sample products into database             |
| `npm run prisma:studio`  | `npx prisma studio`       | Open Prisma Studio (visual database browser)   |

---

## Testing with Postman

A complete Postman collection is included in the project root: `Shopping_Cart_API.postman_collection.json`

### How to Import

1. Open Postman
2. Click the **Import** button (top-left corner)
3. Drag and drop the file `Shopping_Cart_API.postman_collection.json` or click **Upload Files** to select it
4. The collection **"Shopping Cart API"** will appear in your sidebar

### Collection Variables

| Variable    | Value                    | Description             |
| ----------- | ------------------------ | ----------------------- |
| `baseUrl`   | `http://localhost:3000`  | Base URL of the API     |

To change the base URL (e.g., for production), edit the collection variables in Postman.

### Included Requests

The collection contains **9 pre-configured requests** organized in 2 folders:

**Products Folder:**
- GET All Products

**Cart Folder:**
- GET Cart (with total count and price)
- POST Add to Cart (productId + quantity)
- POST Add to Cart (default quantity 1)
- POST Add to Cart - ERROR: Empty Body
- POST Add to Cart - ERROR: Product Not Found
- POST Add to Cart - ERROR: Negative Quantity
- DELETE Remove Item from Cart
- DELETE Remove Cart Item - ERROR: Not Found

### Suggested Test Flow

1. **GET /products** - Verify products are loaded from database
2. **POST /cart** with `{ "productId": 1, "quantity": 2 }` - Add a product to cart
3. **POST /cart** with `{ "productId": 3 }` - Add another product with default quantity
4. **GET /cart** - Verify cart shows both items with correct totals
5. **POST /cart** with `{ "productId": 1, "quantity": 1 }` - Verify quantity increments to 3
6. **DELETE /cart/1** - Remove first cart item
7. **GET /cart** - Verify cart updated correctly
8. Test error cases: empty body, invalid product ID, negative quantity

---

## Key Design Decisions

### 1. Prisma ORM over TypeORM

Prisma was chosen for its:
- **Schema-first approach** - Database schema is defined in a single `.prisma` file
- **Type-safe queries** - All queries are fully typed based on the schema
- **Auto-generated migrations** - Schema changes automatically generate SQL migrations
- **Built-in seeding** - Simple seed script support via `package.json` configuration
- **Prisma Studio** - Visual database browser for debugging

### 2. Upsert Pattern for Cart

Instead of throwing an error when adding a product that already exists in the cart, the quantity is incremented. This provides a better user experience and matches how real e-commerce carts work.

### 3. Cascade Delete

Deleting a product automatically removes its cart items. This prevents orphaned cart items with invalid product references and maintains database integrity.

### 4. Global Exception Filter

A single filter handles ALL exceptions uniformly. This ensures:
- Consistent error response format across the entire API
- No unformatted NestJS default error responses leak to the client
- Every error is logged for debugging

### 5. Response Transformation

All successful responses are automatically wrapped in a standard envelope via `TransformInterceptor`. Controllers return plain data objects, and the interceptor adds `success`, `statusCode`, `message`, `timestamp` fields. This keeps controller code clean and response format consistent.

### 6. Centralized Constants

All error messages and configuration values are stored in dedicated files (`messages.constant.ts`, `app.config.ts`). This:
- Eliminates hardcoded strings throughout the codebase
- Makes message updates easy (single source of truth)
- Enables future internationalization (i18n) support

### 7. Separation of Concerns

Each layer has a single responsibility:
- **Controllers** - Handle HTTP routing and parameter extraction only
- **Services** - Contain all business logic and database queries
- **DTOs** - Define and validate request/response shapes
- **Entities** - Define TypeScript interfaces for data models
- **Filters** - Handle error formatting
- **Interceptors** - Handle cross-cutting concerns (logging, response transformation)

---

## Performance Considerations

1. **Prisma Select Queries** - All database queries use `select` to fetch only required fields, avoiding over-fetching of data
2. **Single Cart Query** - `getCart()` fetches all cart items with product details in a single query using Prisma's `include`, avoiding N+1 query problems
3. **Price Rounding** - `Math.round(totalPrice * 100) / 100` ensures floating-point precision for currency calculations
4. **Global Module** - `PrismaModule` is registered as a global module, so `PrismaService` is a singleton instance shared across all modules (single database connection pool)
5. **ParseIntPipe** - URL parameters are validated and converted to integers at the controller level, preventing invalid database queries
