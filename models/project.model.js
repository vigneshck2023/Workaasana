const mongoose = require('mongoose');

// project schema
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    status: {
      type: String,
      enum: ['Completed', 'In Progress'],
      default: 'In Progress',
    },
  },
  { timestamps: true }
);

// team schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [
    {
      name: { type: String, required: true },
    },
  ],
  description: String,
});

// user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// tag schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

// task schema
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    timeToComplete: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed', 'Blocked'],
      default: 'To Do',
    },
  },
  { timestamps: true }
);

// model exports
const Project = mongoose.model('Project', projectSchema);
const Team = mongoose.model('Team', teamSchema);
const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = { Project, Team, User, Tag, Task };
