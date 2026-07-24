const mongoose = require("mongoose");

// This line is the magic fix:
// It looks for the Render variable first; if it's not there, it uses your local one.
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospital_db";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;