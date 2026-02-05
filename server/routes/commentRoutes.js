const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

/* ================= GET COMMENTS ================= */
/**
 * Get all comments for a specific video
 * Sorted by newest first (like YouTube)
 */
router.get("/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

/* ================= ADD COMMENT ================= */
/**
 * Add a new comment
 * Required fields: videoId, text, username
 */
router.post("/", async (req, res) => {
  try {
    const { videoId, text, username } = req.body;

    // Validation
    if (!videoId || !text || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComment = new Comment({
      videoId,
      text,
      username,
    });

    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

/* ================= DELETE COMMENT ================= */
/**
 * Delete a comment by its ID
 */
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

/* ================= EDIT COMMENT ================= */
/**
 * Edit only the comment text
 */
router.put("/:id", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment" });
  }
});

module.exports = router;