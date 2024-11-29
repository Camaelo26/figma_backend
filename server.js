// server.js

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const chatbotRoutes = require('./routes/chatbot');
const goalsRoutes = require('./routes/goals'); 

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS to allow requests from frontend
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001', 'https://mentalhealthmac.netlify.app'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', chatbotRoutes); // Chatbot-related routes
app.use('/api/goals', goalsRoutes); // Goals-related routes

// Create HTTP server and set up WebSocket
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
