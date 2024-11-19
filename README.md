# Mental Health Support Backend

This repository contains the backend for a mental health support application. It provides APIs for user authentication, chatbot interaction, goal management, and integration with Google Generative AI for empathetic conversations.

## Features

- **User Authentication**: Secure sign-up, login, and profile management using JWT tokens.
- **Chatbot Integration**: Personalized mental health chatbot powered by Google Generative AI.
- **Goal Management**: Users can create, track, and mark personal goals as completed.
- **Database Integration**: MongoDB for storing user data, chat history, and goals.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database for persistent storage.
- **JWT**: Authentication and authorization.
- **Google Generative AI**: Empathetic chatbot responses.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Google Generative AI API Key

### Steps

- Install dependencies:

- bash
- Copy code
- npm install
- Create a .env file in the root directory and add the following variables:


# makefile
- Copy code
- PORT=3000
- MONGO_URI=<your-mongodb-connection-string>
- JWT_SECRET=<your-jwt-secret>
- GEMINI_API_KEY=<your-google-generative-ai-api-key>

# Start the server:

- bash
- Copy code
- npm start
- The server will be running at http://localhost:3000.

## API Endpoints
- Authentication
- POST /auth/signup: Register a new user.
- POST /auth/login: Log in an existing user.
- POST /auth/forgot-password: Request password reset.
- POST /auth/reset-password: Reset a forgotten password.
- GET /auth/profile: Fetch the user profile (requires JWT token).
- PUT /auth/update-profile: Update the user's profile (requires JWT token).

# Chatbot
- POST /api/chatbot: Interact with the AI chatbot.

# Goals
- GET /api/goals: Fetch all goals (requires JWT token).
- POST /api/goals: Add a new goal (requires JWT token).
- PUT /api/goals/complete/:goalId: Mark a goal as completed (requires JWT token).

# File Structure
- server.js: Entry point of the application.
- routes/: Contains route handlers for various API endpoints.
- auth.js: Authentication-related routes.
- chatbot.js: Chatbot interaction routes.
- goals.js: Goal management routes.
- models/: Database schemas (e.g., User model).
- middleware/: Custom middleware for authentication.
- config/: Database connection configuration.
