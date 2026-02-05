const mongoose = require("mongoose");

// Comment schema
const commentSchema = new mongoose.Schema({
  videoId: String,
  text: String,
  username: String, // 👈 store who commented
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);