import { useEffect, useState } from "react";

// Comment section handles display and CRUD operations
export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch comments for the current video
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${videoId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [videoId]);

  /* ================= ADD COMMENT ================= */
  const addComment = async () => {
    // Prevent empty comments
    if (!text.trim()) return;

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // Send username along with comment
      body: JSON.stringify({
        videoId,
        text,
        username: user.username,
      }),
    });

    const newComment = await res.json();

    // Add new comment at top
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

      {/* Add / Edit comment input */}
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

      {/* Comment list */}
      {comments.map((c) => (
        <div key={c._id} className="comment">
          {/* Show username */}
          <strong>{c.username}</strong>

          <p>{c.text}</p>

          {/* Allow edit/delete only for own comments */}
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