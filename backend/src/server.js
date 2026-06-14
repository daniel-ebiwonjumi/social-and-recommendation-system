'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API Running...");
});


// Get users from PostgreSQL
app.get("/users", async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await db.one("SELECT NOW() AS current_time");

    res.json({
      message: "Database connected successfully ✅",
      time: result.current_time
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database connection failed ❌");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

