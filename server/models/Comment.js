const mongoose = require("mongoose");

// Schema for storing comments related to videos
const commentSchema = new mongoose.Schema({
  videoId: String,        // ID of the video
  text: String,           // Comment text
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);