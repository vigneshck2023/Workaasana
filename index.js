// Import required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import and initialize MongoDB connection
const { initializeDatabase } = require("./db/db.connect");

// Import models
const { Task, Team, Project, User, Tag } = require("./models/project.model");

// 🔐 JWT Middleware & Routes
const authMiddleware = require("./middleware/auth.middleware");
const authRoutes = require("./routes/auth.routes");

// ----------------- BASIC ROUTE -----------------
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// ----------------- AUTH ROUTES -----------------
app.use("/api/auth", authRoutes);

// ----------------- TASK ROUTES (PROTECTED) -----------------

app.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project")
      .populate("team")
      .populate("owners");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- PROJECT ROUTES (PROTECTED) -----------------

app.post("/projects", authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/projects", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- USERS (OPTIONALLY PROTECTED) -----------------

app.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- START SERVER -----------------

const startServer = async () => {
  await initializeDatabase();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

module.exports = app;
