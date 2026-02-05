import { useEffect, useState } from "react";

// Comment section handles display and CRUD operations
export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch comments from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${videoId}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [videoId]);

  // Add comment
  const addComment = async () => {
    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, text }),
    });

    const newComment = await res.json();
    setComments([...comments, newComment]);
    setText("");
  };

  // Delete comment
  const deleteComment = async (id) => {
    await fetch(`http://localhost:5000/api/comments/${id}`, { method: "DELETE" });
    setComments(comments.filter(c => c._id !== id));
  };

  // Edit comment
  const editComment = async () => {
    const res = await fetch(`http://localhost:5000/api/comments/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const updated = await res.json();
    setComments(comments.map(c => (c._id === editId ? updated : c)));
    setEditId(null);
    setText("");
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

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

      {comments.map((c) => (
        <div key={c._id} className="comment">
          <p>{c.text}</p>
          <button onClick={() => { setEditId(c._id); setText(c.text); }}>Edit</button>
          <button onClick={() => deleteComment(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}