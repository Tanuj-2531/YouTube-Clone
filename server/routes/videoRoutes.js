const express = require("express");
const Video = require("../models/Video");

const router = express.Router();

/* ================= GET VIDEO (likes) ================= */
/**
 * Get video likes by videoId
 * Agar video DB me nahi hai to create kar deta hai
 */
router.get("/:videoId", async (req, res) => {
  try {
    let video = await Video.findOne({ videoId: req.params.videoId });

    // Agar first time video open ho rahi hai
    if (!video) {
      video = await Video.create({
        videoId: req.params.videoId,
        likes: 0,
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
 * Likes kabhi negative nahi jaayenge
 */
router.post("/unlike/:videoId", async (req, res) => {
  try {
    let video = await Video.findOne({ videoId: req.params.videoId });

    // Agar video exist hi nahi karti
    if (!video) {
      return res.json({ likes: 0 });
    }

    // Likes minimum 0 tak hi ja sakte hain
    video.likes = Math.max(video.likes - 1, 0);
    await video.save();

    res.json({ likes: video.likes });
  } catch (err) {
    res.status(500).json({ message: "Failed to unlike video" });
  }
});

module.exports = router;