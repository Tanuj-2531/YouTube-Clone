const mongoose = require("mongoose");

// Video Schema
// Used for:
// Like count
// Channel ownership
// Edit / Delete control
// Future expansion

const videoSchema = new mongoose.Schema({
  // Unique video ID (frontend videos.js wala)
  videoId: {
    type: String,
    required: true,
    unique: true
  },

  // Channel mapping
  channelId: {
    type: String,
    default: null
  },

  // Owner (user who uploaded)
  owner: {
    type: String,
    default: null
  },

  // Like count (already using)
  likes: {
    type: Number,
    default: 0
  },

  // Optional (future ready)
  dislikes: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);