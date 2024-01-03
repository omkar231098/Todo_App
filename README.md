# Todo App

This project is a simple Todo app backend with CRUD (Create, Read, Update, Delete) functionality for tasks. Additionally, it includes user registration and login APIs for secure access.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Todo CRUD Operations**: Create, Read, Update, and Delete tasks.
- **User Authentication**: Secure user registration and login functionality.
- **Token-based Authentication**: Protects API routes using JWT (JSON Web Tokens).

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing tasks and user data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **JWT**: JSON Web Tokens for secure user authentication

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/todo-app-api.git
    cd todo-app-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/todoapp
    JWT_SECRET=mysecretkey
    ```

4. **Run the application:**
    ```bash
    npm start
    ```
    The API server will be running at `http://localhost:3000`.

## API Routes

- **Create Task:**
  `POST /api/tasks`

- **Get All Tasks:**
  `GET /api/tasks`

- **Get Task by ID:**
  `GET /api/tasks/:id`

- **Update Task by ID:**
  `PUT /api/tasks/:id`

- **Delete Task by ID:**
  `DELETE /api/tasks/:id`

- **User Registration:**
  `POST /api/users/register`

- **User Login:**
  `POST /api/users/login`
  
## Authentication

To access protected routes related to Todo operations, use Bearer token authentication.

- Include the token in the `Authorization` header using the format:
  ```http
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...

## Error Handling

The API employs a detailed error handling mechanism for better user experience.

- **400 Bad Request:**
  - Indicates an invalid request or missing required parameters.
  
- **401 Unauthorized:**
  - Occurs when the token is missing or invalid.
  
- **403 Forbidden:**
  - Access is denied due to insufficient privileges.
  
- **404 Not Found:**
  - Indicates that the requested resource is not found.
  
- **500 Internal Server Error:**
  - Signifies an unexpected server error.

## Contributing

We welcome contributions! If you have suggestions or improvements for the error handling process, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
