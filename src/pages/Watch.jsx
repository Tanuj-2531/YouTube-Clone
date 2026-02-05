import { useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../data/videos";
import CommentSection from "../components/CommentSection";

export default function Watch() {
  const { videoId } = useParams();

  // Find selected video
  const video = videos.find((v) => v.videoId === videoId);

  // Like counter (frontend only)
  const [likes, setLikes] = useState(video.likes || 0);

  if (!video) return <h2>Video not found</h2>;

  return (
    <div className="watch-page">
      {/* Video Player */}
      <video className="video-player" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {/* Video Info */}
      <h1 className="video-title">{video.title}</h1>
      <p className="video-channel">{video.channelName}</p>

      {/* Actions */}
      <div className="video-actions">
        <button onClick={() => setLikes(likes + 1)}>
          👍 {likes}
        </button>
        <button>👎</button>
      </div>

      {/* Description */}
      <p className="video-description">{video.description}</p>

      {/* Comments */}
      <CommentSection videoId={videoId} />
    </div>
  );
}