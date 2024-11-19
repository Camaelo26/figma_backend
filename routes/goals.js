const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new goal
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

    // Ensure chatHistory is initialized
    if (!user.chatHistory) {
      user.chatHistory = [];
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


// Fetch all goals for the user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.goals); // Return goals
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
});

// Mark a goal as completed
router.put('/complete/:goalId', authMiddleware, async (req, res) => {
  const { goalId } = req.params;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const goal = user.goals.id(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.completed = true;
    await user.save(); // Save changes to database

    res.json({ message: 'Goal marked as complete', goals: user.goals });
  } catch (error) {
    console.error('Error completing goal:', error);
    res.status(500).json({ message: 'Failed to complete goal' });
  }
});

module.exports = router;
