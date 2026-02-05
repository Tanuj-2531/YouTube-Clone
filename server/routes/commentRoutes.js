const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// Get comments for a video
router.get("/:videoId", async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
});

// Add a new comment
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  await newComment.save();
  res.json(newComment);
});

// Delete comment
router.delete("/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Edit comment
router.put("/:id", async (req, res) => {
  const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;