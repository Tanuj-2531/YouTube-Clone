import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videos from "../data/videos";
import CommentSection from "../components/CommentSection";
import RelatedVideos from "../components/RelatedVideos";

export default function Watch() {
  const { videoId } = useParams();

  // Find current video
  const video = videos.find((v) => v.videoId === videoId);

  // Likes from database
  const [likes, setLikes] = useState(0);

  // Fetch likes from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/videos/${videoId}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes));
  }, [videoId]);

  // Handle like button
  const handleLike = async () => {
    const res = await fetch(
      `http://localhost:5000/api/videos/like/${videoId}`,
      { method: "POST" }
    );
    const data = await res.json();
    setLikes(data.likes);
  };

  if (!video) return <h2>Video not found</h2>;

  return (
    <div className="watch-layout">
      {/* MAIN VIDEO SECTION */}
      <div className="watch-main">
        <video className="video-player" controls>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>

        <h1 className="video-title">{video.title}</h1>
        <p className="video-channel">{video.channelName}</p>

        <div className="video-actions">
          <button onClick={handleLike}>👍 {likes}</button>
          <button disabled>👎</button>
        </div>

        <p className="video-description">{video.description}</p>

        <CommentSection videoId={videoId} />
      </div>

      {/* RELATED VIDEOS SIDEBAR */}
      <RelatedVideos currentVideo={video} />
    </div>
  );
}