// routes/chatbot.js

const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Act as a personal mental health friend, responding with empathy and understanding.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

router.post('/chatbot', async (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ message: 'Username and message are required' });
  }

  try {
    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Start chat session with the AI model
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the user's message to the AI and get the response
    const result = await chatSession.sendMessage(message);
    const botMessage = result.response.text();

    // Save the conversation in the user's chat history
    user.chatHistory.push({ role: 'user', message });
    user.chatHistory.push({ role: 'bot', message: botMessage });
    await user.save();

    // Send the bot's response back to the user
    res.json({ response: botMessage });
  } catch (error) {
    console.error('Error from Gemini API:', error);
    res.status(500).json({ message: 'Failed to get a response from the AI', error });
  }
});
;


module.exports = router;
