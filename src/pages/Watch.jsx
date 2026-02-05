import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../data/videos";
import CommentSection from "../components/CommentSection";
import RelatedVideos from "../components/RelatedVideos";

export default function Watch() {
  const { videoId } = useParams();

  // Find current video
  const video = videos.find((v) => v.videoId === videoId);

  // DB-driven likes
  const [likes, setLikes] = useState(0);

  // UI + session state
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislikes] = useState(0);

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    // Fetch likes from backend
    fetch(`http://localhost:5000/api/videos/${videoId}`)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes || 0);
      });

    // Restore state from localStorage
    const storedLike = localStorage.getItem(`liked-${videoId}`);
    const storedDislike = localStorage.getItem(`disliked-${videoId}`);
    const storedDislikeCount = localStorage.getItem(
      `dislikeCount-${videoId}`
    );

    setLiked(storedLike === "true");
    setDisliked(storedDislike === "true");
    setDislikes(storedDislikeCount ? Number(storedDislikeCount) : 0);
  }, [videoId]);

  /* ================= LIKE HANDLER ================= */
  const handleLike = async () => {
    if (liked) {
      // UNLIKE
      const res = await fetch(
        `http://localhost:5000/api/videos/unlike/${videoId}`,
        { method: "POST" }
      );
      const data = await res.json();

      setLikes(data.likes);
      setLiked(false);
      localStorage.removeItem(`liked-${videoId}`);
    } else {
      // LIKE
      const res = await fetch(
        `http://localhost:5000/api/videos/like/${videoId}`,
        { method: "POST" }
      );
      const data = await res.json();

      setLikes(data.likes);
      setLiked(true);
      localStorage.setItem(`liked-${videoId}`, "true");

      // Remove dislike if active
      if (disliked) {
        const newCount = Math.max(dislikes - 1, 0);
        setDisliked(false);
        setDislikes(newCount);

        localStorage.removeItem(`disliked-${videoId}`);
        localStorage.setItem(`dislikeCount-${videoId}`, newCount);
      }
    }
  };

  /* ================= DISLIKE HANDLER ================= */
  const handleDislike = () => {
    if (disliked) {
      // UNDISLIKE
      const newCount = Math.max(dislikes - 1, 0);
      setDisliked(false);
      setDislikes(newCount);

      localStorage.removeItem(`disliked-${videoId}`);
      localStorage.setItem(`dislikeCount-${videoId}`, newCount);
    } else {
      // DISLIKE
      const newCount = dislikes + 1;
      setDisliked(true);
      setDislikes(newCount);

      localStorage.setItem(`disliked-${videoId}`, "true");
      localStorage.setItem(`dislikeCount-${videoId}`, newCount);

      // Remove like if active
      if (liked) {
        setLiked(false);
        localStorage.removeItem(`liked-${videoId}`);
      }
    }
  };

  if (!video) return <h2>Video not found</h2>;

  return (
    <div className="watch-layout">
      <div className="watch-main">
        <video className="video-player" controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>

        <h1 className="video-title">{video.title}</h1>
        <p className="video-channel">{video.channelName}</p>

        <div className="video-actions">
          <button
            onClick={handleLike}
            className={liked ? "active" : ""}
          >
            👍 {likes}
          </button>

          <button
            onClick={handleDislike}
            className={disliked ? "active" : ""}
          >
            👎 {dislikes}
          </button>
        </div>

        <p className="video-description">{video.description}</p>

        <CommentSection videoId={videoId} />
      </div>

      <RelatedVideos currentVideo={video} />
    </div>
  );
}