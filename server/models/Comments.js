const mongoose = require("mongoose");

// Comment schema linked to a video
const commentSchema = new mongoose.Schema({
  videoId: String,      // Which video this comment belongs to
  text: String,         // Comment text
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);