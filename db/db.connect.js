const mongoose = require("mongoose");
require("dotenv").config();

const MONGOURI = process.env.MONGODB;

const initializeDatabase = async () => {
    await mongoose.connect(MONGOURI).then(() => {
        console.log("DB connected successfully");
    }).catch((error) => {
        console.log("Something went wrong", error);
    })
    }

module.exports = {initializeDatabase};