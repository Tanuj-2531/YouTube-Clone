const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  channelId: String,
  channelName: String,
  owner: String, // userId
  description: String,
  channelBanner: String,
  subscribers: { type: Number, default: 0 },
  videos: [String] // videoIds
}, { timestamps: true });

module.exports = mongoose.model("Channel", channelSchema);