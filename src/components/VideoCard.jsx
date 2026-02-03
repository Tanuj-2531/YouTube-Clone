import MoreVertIcon from "@mui/icons-material/MoreVert";

// Displays individual video info
export default function VideoCard({ video }) {
  return (
    <div className="video-card">

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

        {/* 3-dot menu */}
        <MoreVertIcon className="menu-icon" />

      </div>
    </div>
  );
}