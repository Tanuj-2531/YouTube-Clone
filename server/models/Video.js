const mongoose = require("mongoose");

// Video schema (only likes needed for now)
const videoSchema = new mongoose.Schema({
  videoId: String,
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Video", videoSchema);