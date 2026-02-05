const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema({
  videoId: String,          // Which video this comment belongs to
  text: String,             // Comment text
  username: String,         // Comment author
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);