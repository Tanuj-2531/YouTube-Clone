const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= ROUTES =================
const commentRoutes = require("./routes/commentRoutes");
const videoRoutes = require("./routes/videoRoutes");

// ✅ NEW — Channel Routes (Requirement 5)
const channelRoutes = require("./routes/channelRoutes");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================

// Comment APIs
app.use("/api/comments", commentRoutes);

// Video APIs
app.use("/api/videos", videoRoutes);

// ✅ Channel APIs (NEW)
app.use("/api/channels", channelRoutes);


// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ================= SERVER START =================
app.listen(5000, () => console.log("Server running on port 5000"));