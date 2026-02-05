const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

/* ================= GET COMMENTS ================= */
/**
 * Get all comments for a specific video
 * Sorted by newest first
 */
router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    }).sort({ createdAt: -1 }); // newest comments on top

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

/* ================= ADD COMMENT ================= */
/**
 * Add a new comment
 * Expects: videoId, text, username
 */
router.post("/", async (req, res) => {
  try {
    const { videoId, text, username } = req.body;

    // Basic validation
    if (!videoId || !text || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({
      videoId,
      text,
      username, // 👈 store username with comment
    });

    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

/* ================= DELETE COMMENT ================= */
/**
 * Delete a comment by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

/* ================= EDIT COMMENT ================= */
/**
 * Edit a comment by ID
 * Expects updated text
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment" });
  }
});

module.exports = router;