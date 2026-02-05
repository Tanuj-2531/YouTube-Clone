import { useEffect, useState } from "react";

/* ================= TIME AGO HELPER ================= */
/**
 * Converts date to human-readable format like:
 * "2 hours ago", "5 minutes ago"
 */
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

// ================= COMMENT SECTION =================
export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${videoId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [videoId]);

  /* ================= ADD COMMENT ================= */
  const addComment = async () => {
    if (!text.trim()) return;

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId,
        text,
        username: user.username,
      }),
    });

    const newComment = await res.json();

    setComments([newComment, ...comments]);
    setText("");
  };

  /* ================= DELETE COMMENT ================= */
  const deleteComment = async (id) => {
    await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "DELETE",
    });

    setComments(comments.filter((c) => c._id !== id));
  };

  /* ================= EDIT COMMENT ================= */
  const editComment = async () => {
    if (!text.trim()) return;

    const res = await fetch(
      `http://localhost:5000/api/comments/${editId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }
    );

    const updated = await res.json();

    setComments(
      comments.map((c) => (c._id === editId ? updated : c))
    );

    setEditId(null);
    setText("");
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {/* Add / Edit Input */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
      />

      {editId ? (
        <button onClick={editComment}>Update</button>
      ) : (
        <button onClick={addComment}>Comment</button>
      )}

      {/* Comments List */}
      {comments.map((c) => (
        <div key={c._id} className="comment">
          <div className="comment-header">
            <strong>{c.username}</strong>
            <span className="comment-time">
              {timeAgo(c.createdAt)}
            </span>
          </div>

          <p>{c.text}</p>

          {/* Only owner can edit/delete */}
          {user.username === c.username && (
            <>
              <button
                onClick={() => {
                  setEditId(c._id);
                  setText(c.text);
                }}
              >
                Edit
              </button>

              <button onClick={() => deleteComment(c._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}