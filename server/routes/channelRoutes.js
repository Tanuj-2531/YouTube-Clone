/* ================= IMPORTS ================= */
const express = require("express");
const Channel = require("../models/Channel");

const router = express.Router();

/* ================= CREATE CHANNEL ================= */
/**
 Only logged-in user can create channel
 Prevents multiple channels per user
 */
router.post("/create", async (req, res) => {
  try {

    console.log("CREATE CHANNEL REQUEST BODY:", req.body);

    const { owner, channelName } = req.body;

    /* ===== VALIDATION ===== */
    if (!owner || !channelName) {
      console.log("VALIDATION FAILED");
      return res.status(400).json({
        message: "Owner and Channel Name required",
      });
    }

    /* ===== CHECK IF USER ALREADY HAS CHANNEL ===== */
    const existingChannel = await Channel.findOne({ owner });

    if (existingChannel) {
      console.log("USER ALREADY HAS CHANNEL:", existingChannel.channelId);
      return res.status(400).json({
        message: "User already has a channel",
      });
    }

    /* ===== CREATE CHANNEL ===== */
    const channel = await Channel.create(req.body);

    console.log("CHANNEL CREATED SUCCESS:", channel.channelId);

    res.json(channel);

  } catch (err) {

    console.log("CREATE CHANNEL ERROR:", err);

    res.status(500).json({
      message: err.message || "Channel create failed",
    });
  }
});


/* ================= GET USER CHANNEL ================= */
/**
 Get channel by owner userId
 */
router.get("/user/:userId", async (req, res) => {
  try {

    console.log("GET USER CHANNEL:", req.params.userId);

    const channel = await Channel.findOne({
      owner: req.params.userId,
    });

    if (!channel) {
      console.log("CHANNEL NOT FOUND FOR USER");
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.json(channel);

  } catch (err) {

    console.log("GET USER CHANNEL ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch channel",
    });
  }
});


/* ================= GET CHANNEL BY CHANNEL ID ================= */
/**
 Get channel public data
 */
router.get("/:channelId", async (req, res) => {
  try {

    console.log("GET CHANNEL BY ID:", req.params.channelId);

    const channel = await Channel.findOne({
      channelId: req.params.channelId,
    });

    if (!channel) {
      console.log("CHANNEL NOT FOUND");
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.json(channel);

  } catch (err) {

    console.log("GET CHANNEL ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch channel",
    });
  }
});


/* ================= DELETE CHANNEL (NEW) ================= */
/**
 Delete channel by owner (username)
 */
router.delete("/delete/:owner", async (req, res) => {
  try {

    console.log("DELETE CHANNEL REQUEST:", req.params.owner);

    const deletedChannel = await Channel.findOneAndDelete({
      owner: req.params.owner,
    });

    if (!deletedChannel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    console.log("CHANNEL DELETED SUCCESS:", deletedChannel.channelId);

    res.json({
      message: "Channel deleted successfully",
    });

  } catch (err) {

    console.log("DELETE CHANNEL ERROR:", err);

    res.status(500).json({
      message: "Failed to delete channel",
    });
  }
});

module.exports = router;