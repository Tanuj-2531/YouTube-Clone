const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
    unique: true
  },

  channelName: {
    type: String,
    required: true
  },

  owner: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  channelBanner: {
    type: String,
    default: "/channelBanner.png",
  },

  subscribers: {
    type: Number,
    default: 0
  },

  videos: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Channel", channelSchema);