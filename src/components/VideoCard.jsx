import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

// Displays individual video info
export default function VideoCard({ video }) {
  const navigate = useNavigate();

  // Navigate to watch page on click
  const openVideo = () => {
    navigate(`/watch/${video.videoId}`);
  };

  return (
    // Make entire card clickable
    <div className="video-card" onClick={openVideo}>

      {/* Thumbnail Section */}
      <div className="thumbnail-wrapper">
        <img src={video.thumbnailUrl} alt={video.title} />
        <span className="duration">{video.duration}</span>
      </div>

      {/* Video Info Section */}
      <div className="video-info">

        {/* Channel Avatar */}
        <img
          className="channel-avatar"
          src={video.channelAvatar}
          alt={video.channelName}
        />

        {/* Text Info */}
        <div className="video-text">
          <h4 className="video-title">{video.title}</h4>
          <p className="channel-name">{video.channelName}</p>
          <p className="video-meta">
            {video.views} • {video.uploadTime}
          </p>
        </div>

        {/* 3-dot menu (stop click bubbling) */}
        <MoreVertIcon
          className="menu-icon"
          onClick={(e) => e.stopPropagation()}
        />

      </div>
    </div>
  );
}