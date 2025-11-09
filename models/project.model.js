const mongoose = require('mongoose');

// task schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  tags: [String],
  timeToComplete: { type: Number, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Completed', 'Blocked'], default: 'To Do' },
}, { timestamps: true });

// team schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [
    { name: { type: String, required: true } },
  ],
  description: String,
});

// project schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  status: { type: String, enum: ['Completed', 'In Progress'], default: 'In Progress' },
}, { timestamps: true });

// user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// tag schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = {
  Task: mongoose.model('Task', taskSchema),
  Team: mongoose.model('Team', teamSchema),
  Project: mongoose.model('Project', projectSchema),
  User: mongoose.model('User', userSchema),
  Tag: mongoose.model('Tag', tagSchema)
};
