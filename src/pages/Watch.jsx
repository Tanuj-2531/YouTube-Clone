import { useParams } from "react-router-dom";
import videos from "../data/videos";
import CommentSection from "../components/CommentSection";

// Watch page displays the selected video and its details
export default function Watch() {
  const { id } = useParams();

  // Find video by ID
  const video = videos.find((v) => v.videoId === id);

  if (!video) return <h2>Video not found</h2>;

  return (
    <div className="watch-page">
      {/* Video Player */}
      <video controls className="video-player">
        <source src={video.videoUrl} type="video/mp4" />
      </video>

      {/* Video Info */}
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <p className="channel-name">{video.channelName}</p>

      {/* Like / Dislike Buttons (UI only) */}
      <div className="video-actions">
        <button>👍 Like</button>
        <button>👎 Dislike</button>
      </div>

      {/* Comments Section */}
      <CommentSection videoId={video.videoId} />
    </div>
  );
}