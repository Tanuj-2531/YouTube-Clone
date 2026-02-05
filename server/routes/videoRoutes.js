const express = require("express");
const Video = require("../models/Video");

const router = express.Router();

/* Get likes for a video */
router.get("/:videoId", async (req, res) => {
  let video = await Video.findOne({ videoId: req.params.videoId });

  if (!video) {
    video = await Video.create({ videoId: req.params.videoId });
  }

  res.json(video);
});

/* Like a video */
router.post("/like/:videoId", async (req, res) => {
  const video = await Video.findOneAndUpdate(
    { videoId: req.params.videoId },
    { $inc: { likes: 1 } },
    { new: true, upsert: true }
  );

  res.json(video);
});

module.exports = router;