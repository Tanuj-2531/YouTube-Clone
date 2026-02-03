import HomeIcon from "@mui/icons-material/Home";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DownloadIcon from "@mui/icons-material/Download";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeedbackIcon from "@mui/icons-material/Feedback";

// Sidebar navigation menu
export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
      
      {/* SECTION 1 */}
      <div className="sidebar-item active"><HomeIcon /> Home</div>
      <div className="sidebar-item"><SmartDisplayIcon /> Shorts</div>

      <hr />

      {/* SECTION 2 — SUBSCRIPTIONS */}
      <div className="sidebar-title">Subscriptions</div>
      <div className="sidebar-item">ashish chanchlani v...</div>
      <div className="sidebar-item">CarryMinati</div>
      <div className="sidebar-item">Bhaijan Marg</div>
      <div className="sidebar-item">Gulzaar Chhaniwala</div>
      <div className="sidebar-item">akuma xD</div>
      <div className="sidebar-item">Swagger Sharma</div>
      <div className="sidebar-item">Show more</div>

      <hr />

      {/* SECTION 3 — YOU */}
      <div className="sidebar-title">You</div>
      <div className="sidebar-item"><HistoryIcon /> History</div>
      <div className="sidebar-item"><PlaylistPlayIcon /> Playlists</div>
      <div className="sidebar-item"><WatchLaterIcon /> Watch later</div>
      <div className="sidebar-item"><ThumbUpAltOutlinedIcon /> Liked videos</div>
      <div className="sidebar-item"><VideoLibraryIcon /> Your videos</div>
      <div className="sidebar-item"><DownloadIcon /> Downloads</div>
      <div className="sidebar-item">Show more</div>

      <hr />

      {/* SECTION 4 — EXPLORE */}
      <div className="sidebar-title">Explore</div>
      <div className="sidebar-item"><LocalMallIcon /> Shopping</div>
      <div className="sidebar-item"><MusicNoteIcon /> Music</div>
      <div className="sidebar-item"><MovieIcon /> Films</div>
      <div className="sidebar-item">Show more</div>

      <hr />

      {/* SECTION 5 — MORE FROM YOUTUBE */}
      <div className="sidebar-title">More from YouTube</div>
      <div className="sidebar-item"><YouTubeIcon /> YouTube Premium</div>
      <div className="sidebar-item"><YouTubeIcon /> YouTube Studio</div>
      <div className="sidebar-item"><YouTubeIcon /> YouTube Music</div>
      <div className="sidebar-item"><YouTubeIcon /> YouTube Kids</div>

      <hr />

      {/* SECTION 6 — SETTINGS */}
      <div className="sidebar-item"><SettingsIcon /> Settings</div>
      <div className="sidebar-item"><FlagIcon /> Report history</div>
      <div className="sidebar-item"><HelpOutlineIcon /> Help</div>
      <div className="sidebar-item"><FeedbackIcon /> Send feedback</div>

      <hr />

      {/* FOOTER LINKS */}
      <div className="sidebar-footer">
        <p>About Press Copyright</p>
        <p>Contact us Creator Advertise Developers</p>
        <p>Terms Privacy Policy & Safety</p>
        <p>How YouTube works Test new features</p>
        <p className="copyright">© 2026 MyTube</p>
      </div>

    </aside>
  );
}