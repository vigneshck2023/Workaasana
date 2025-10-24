const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  tags: [String],
  timeToComplete: { type: Number, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed', 'Blocked'], default: 'To Do' },
}, { timestamps: true });

// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
});

// Project Schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String
}, { timestamps: true });

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

// Export all models
module.exports = {
  Task: mongoose.model('Task', taskSchema),
  Team: mongoose.model('Team', teamSchema),
  Project: mongoose.model('Project', projectSchema),
  User: mongoose.model('User', userSchema),
  Tag: mongoose.model('Tag', tagSchema)
};
