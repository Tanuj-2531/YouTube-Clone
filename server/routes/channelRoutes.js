const express = require("express");
const Channel = require("../models/Channel");

const router = express.Router();

/* ================= CREATE CHANNEL ================= */
/**
 Only logged-in user can create channel
 */
router.post("/create", async (req, res) => {
  try {
    const channel = await Channel.create(req.body);
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: "Channel create failed" });
  }
});

/* ================= GET USER CHANNEL ================= */
router.get("/user/:userId", async (req, res) => {
  const channel = await Channel.findOne({ owner: req.params.userId });
  res.json(channel);
});

/* ================= GET CHANNEL VIDEOS ================= */
router.get("/:channelId", async (req, res) => {
  const channel = await Channel.findOne({
    channelId: req.params.channelId
  });
  res.json(channel);
});

module.exports = router;