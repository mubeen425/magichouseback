const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
require('colors');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 60000,
    });
    console.log("Connected to MongoDB".green.bold);
  } catch (error) {
    console.error("Error connecting to MongoDB:".red.bold, error.message);
  }
};

module.exports = connectDB;
