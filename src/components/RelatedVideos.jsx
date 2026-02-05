import { Link } from "react-router-dom";
import videos from "../data/videos";

/**
 * Shows related videos based on same category
 * Excludes the currently playing video
 */
export default function RelatedVideos({ currentVideo }) {
  // Filter videos: same category, not current video
  const relatedVideos = videos.filter(
    (video) =>
      video.videoId !== currentVideo.videoId &&
      video.category === currentVideo.category
  );

  return (
    <div className="related-videos">
      <h3>Related Videos</h3>

      {relatedVideos.length === 0 && (
        <p className="no-related">No related videos</p>
      )}

      {relatedVideos.map((video) => (
        <Link
          key={video.videoId}
          to={`/watch/${video.videoId}`}
          className="related-video-card"
        >
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="related-thumbnail"
          />

          <div className="related-info">
            <p className="related-title">{video.title}</p>
            <span className="related-channel">
              {video.channelName}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}