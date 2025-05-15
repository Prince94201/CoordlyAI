# Business Intelligence Agent API Documentation

## Authentication
All endpoints (except `/signup` and `/login`) require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Signup
- **POST** `/api/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` on success
  ```json
  { "message": "Signup successful." }
  ```
  - `409 Conflict` if username exists

---

### 2. Login
- **POST** `/api/login`
- **Description:** Authenticate user and receive JWT token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` on success
  ```json
  { "token": "<jwt-token>" }
  ```
  - `401 Unauthorized` on invalid credentials

---

### 3. Query (Ask BI Agent)
- **POST** `/api/query`
- **Description:** Ask a business question in natural language. Returns SQL, data, insights, visualization config, and a natural language summary.
- **Headers:**
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "question": "Show me the top 5 products by sales amount in 2024."
  }
  ```
- **Response:**
  - `200 OK` on success
  ```json
  {
    "data": [ ...SQL result rows... ],
    "insights": [ "...", "..." ],
    "visualization": {
      "type": "bar|line|pie|table",
      "x": "column",
      "y": "column"
    },
    "nlp_text": "Natural language summary of the result."
  }
  ```
  - `401 Unauthorized` if token missing/invalid
  - `400 Bad Request` if question missing

---

### 4. Get Database Schema
- **GET** `/api/schema`
- **Description:** Retrieve the current database schema (table and column info).
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "schema": {
      "table1": [ { "name": "col1", "type": "TEXT" }, ... ],
      ...
    }
  }
  ```

---

### 5. Get Chat History
- **GET** `/api/history`
- **Description:** Retrieve the last 50 queries and responses for the authenticated user.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "history": [
      {
        "id": 1,
        "user_id": 2,
        "question": "...",
        "response": "...JSON string...",
        "created_at": "2025-05-15T12:34:56Z"
      },
      ...
    ]
  }
  ```

---

## Error Responses
- All errors return JSON with an `error` field and appropriate HTTP status code.

---

## Example Usage
**Signup:**
```sh
curl -X POST http://localhost:3000/api/signup -H "Content-Type: application/json" -d '{"username":"user1","password":"pass"}'
```

**Login:**
```sh
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"username":"user1","password":"pass"}'
```

**Query:**
```sh
curl -X POST http://localhost:3000/api/query -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"question":"Show me the top 5 products by sales amount in 2024."}'
```

**Get Schema:**
```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/schema
```

**Get Chat History:**
```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/history
```
