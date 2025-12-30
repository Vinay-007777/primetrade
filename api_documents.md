# PrimeTrade API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication

### Register User
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response**: User object + JWT Token

### Login User
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response**: User object + JWT Token

### Get Profile
- **Endpoint**: `GET /auth/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User profile data

## Tasks

### Get All Tasks
- **Endpoint**: `GET /tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of tasks

### Create Task
- **Endpoint**: `POST /tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Complete Project",
    "description": "Finish the API docs"
  }
  ```
- **Response**: Created task object

### Update Task
- **Endpoint**: `PUT /tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description"
  }
  ```
- **Response**: Updated task object

### Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "id": "task_id" }`
