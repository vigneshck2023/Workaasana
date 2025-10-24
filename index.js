const express = require("express");
const app = express();
app.use(express.json())

const {initializeDatabase} = require("./db/db.connect");

initializeDatabase();

const {Task, Team, Project, User, Tag} = require("./models/project.model");

app.get("/", (req,res) => {
    res.send("Server is Running");
})

// Create a new Team
app.post('/teams', async (req, res) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new Task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Tasks (with populated references)
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('project')
      .populate('team')
      .populate('owners');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete Task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------------- Teams -------------------

// Create Team
app.post('/teams', async (req, res) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Teams
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//------------------- Project -----------------------
// Create Project
app.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- USER ROUTES -----------------

// Create User
app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));