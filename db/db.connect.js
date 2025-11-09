const mongoose = require("mongoose");
require("dotenv").config();

const MONGOURI = process.env.MONGODB;

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB with proper options
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Stop server if connection fails
  }
};

module.exports = { initializeDatabase };
