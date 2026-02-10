/* ================= IMPORTS ================= */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* ================= ROUTES ================= */
const commentRoutes = require("./routes/commentRoutes");
const videoRoutes = require("./routes/videoRoutes");
const channelRoutes = require("./routes/channelRoutes");

/* ================= APP INIT ================= */
const app = express();

/* ================= MIDDLEWARE ================= */

// Enable CORS (Frontend React -> Backend Node)
app.use(cors());

// Parse JSON body
app.use(express.json());

/* ================= HEALTH CHECK ================= */
// Useful for testing server quickly
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ================= API ROUTES ================= */

// Comments APIs
app.use("/api/comments", commentRoutes);

// Video APIs
app.use("/api/videos", videoRoutes);

// Channel APIs
app.use("/api/channels", channelRoutes);

/* ================= DATABASE CONNECTION ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Start server only after DB connects (Best Practice)
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
  });

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong on server",
  });
});