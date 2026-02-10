const express = require("express");
const Video = require("../models/Video");

const router = express.Router();

/* ================= GET VIDEO (likes + info) ================= */
/**
 * Get video data by videoId
 * Creates video entry if first time opened
 */
router.get("/:videoId", async (req, res) => {
  try {
    let video = await Video.findOne({ videoId: req.params.videoId });

    // If video is opening first time
    if (!video) {
      video = await Video.create({
        videoId: req.params.videoId,
        likes: 0,
        channelId: null,
        owner: null
      });
    }

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch video data" });
  }
});

/* ================= LIKE VIDEO ================= */
/**
 * Increase like count by 1
 */
router.post("/like/:videoId", async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { videoId: req.params.videoId },
      { $inc: { likes: 1 } },
      { new: true, upsert: true }
    );

    res.json({ likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: "Failed to like video" });
  }
});

/* ================= UNLIKE VIDEO ================= */
/**
 * Decrease like count by 1
 */
router.post("/unlike/:videoId", async (req, res) => {
  try {
    let video = await Video.findOne({ videoId: req.params.videoId });

    if (!video) return res.json({ likes: 0 });

    video.likes = Math.max(video.likes - 1, 0);
    await video.save();

    res.json({ likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: "Failed to unlike video" });
  }
});

/* =============== CHANNEL PAGE REQUIREMENTS =============== */

/* ================= ADD VIDEO TO CHANNEL ================= */
/**
 * Used when uploading or assigning video to channel
 */
router.post("/assign-channel", async (req, res) => {
  try {
    const { videoId, channelId, owner } = req.body;

    const video = await Video.findOneAndUpdate(
      { videoId },
      { channelId, owner },
      { new: true, upsert: true }
    );

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign channel" });
  }
});

/* ================= GET VIDEOS BY CHANNEL ================= */
/**
 * Channel page video list
 */
router.get("/channel/:channelId", async (req, res) => {
  try {
    const videos = await Video.find({
      channelId: req.params.channelId
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch channel videos" });
  }
});

/* ================= DELETE VIDEO ================= */
/**
 * Owner can delete their video
 */
router.delete("/:videoId", async (req, res) => {
  try {
    await Video.deleteOne({ videoId: req.params.videoId });
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

/* ================= EDIT VIDEO ================= */
/**
 * Owner can edit video details
 */
router.put("/:videoId", async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { videoId: req.params.videoId },
      req.body,
      { new: true }
    );

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;