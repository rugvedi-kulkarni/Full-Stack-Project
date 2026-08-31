const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const appointmentRoutes = require("../backend/routes/appointmentRoutes");

const app = express();

const path = require('path');

// This tells Render to serve all your HTML/CSS/JS files from your main folder
app.use(express.static(__dirname));

// This tells Render: "When someone visits the home link, send them my HTML file"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
});

// 1. UPDATE: Use Render's port if available, otherwise use 3000 for local testing
const PORT = process.env.PORT || 27017;

connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));
app.use("/api", appointmentRoutes);

// 2. UPDATE: Listen on '0.0.0.0' so Render can access the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});