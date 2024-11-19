const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
});

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  chatHistory: [chatHistorySchema], // Add chat history array
  goals: [goalSchema], // Goals array
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
