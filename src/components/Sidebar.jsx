import { Link } from "react-router-dom";

/* ================= ICONS ================= */
import HomeIcon from "@mui/icons-material/Home";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
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

/* NEW ICONS */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/* ================= SIDEBAR COMPONENT ================= */
export default function Sidebar({ isOpen }) {

  /* ================= GET LOGGED USER ================= */
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className={`sidebar ${isOpen ? "" : "closed"}`}>

      {/* ================= HOME ================= */}
      <Link to="/" className="sidebar-item active">
        <HomeIcon /> Home
      </Link>

      <div className="sidebar-item">
        <SmartDisplayIcon /> Shorts
      </div>

      <hr />

      {/* ================= CHANNEL SECTION (ONLY IF LOGGED IN) ================= */}
      {user && (
        <>
          <div className="sidebar-title">Your Channel</div>

          {/* CREATE CHANNEL */}
          <Link to="/create-channel" className="sidebar-item">
            <AddCircleOutlineIcon /> Create Channel
          </Link>

          {/* MY CHANNEL */}
          <Link to="/my-channel" className="sidebar-item">
            <AccountCircleIcon /> My Channel
          </Link>

          <hr />
        </>
      )}

      {/* ================= SUBSCRIPTIONS ================= */}
      <div className="sidebar-title">Subscriptions</div>
      <div className="sidebar-item">ashish chanchlani v...</div>
      <div className="sidebar-item">CarryMinati</div>
      <div className="sidebar-item">Bhaijan Marg</div>
      <div className="sidebar-item">Gulzaar Chhaniwala</div>
      <div className="sidebar-item">akuma xD</div>
      <div className="sidebar-item">Swagger Sharma</div>
      <div className="sidebar-item">Show more</div>

      <hr />

      {/* ================= YOU ================= */}
      <div className="sidebar-title">You</div>

      <div className="sidebar-item">
        <HistoryIcon /> History
      </div>

      <div className="sidebar-item">
        <PlaylistPlayIcon /> Playlists
      </div>

      <div className="sidebar-item">
        <WatchLaterIcon /> Watch later
      </div>

      <div className="sidebar-item">
        <ThumbUpAltOutlinedIcon /> Liked videos
      </div>

      <div className="sidebar-item">
        <VideoLibraryIcon /> Your videos
      </div>

      <div className="sidebar-item">
        <DownloadIcon /> Downloads
      </div>

      <div className="sidebar-item">Show more</div>

      <hr />

      {/* ================= EXPLORE ================= */}
      <div className="sidebar-title">Explore</div>

      <div className="sidebar-item">
        <LocalMallIcon /> Shopping
      </div>

      <div className="sidebar-item">
        <MusicNoteIcon /> Music
      </div>

      <div className="sidebar-item">
        <MovieIcon /> Films
      </div>

      <div className="sidebar-item">Show more</div>

      <hr />

      {/* ================= MORE FROM YOUTUBE ================= */}
      <div className="sidebar-title">More from YouTube</div>

      <div className="sidebar-item">
        <YouTubeIcon /> YouTube Premium
      </div>

      <div className="sidebar-item">
        <YouTubeIcon /> YouTube Studio
      </div>

      <div className="sidebar-item">
        <YouTubeIcon /> YouTube Music
      </div>

      <div className="sidebar-item">
        <YouTubeIcon /> YouTube Kids
      </div>

      <hr />

      {/* ================= SETTINGS ================= */}
      <div className="sidebar-item">
        <SettingsIcon /> Settings
      </div>

      <div className="sidebar-item">
        <FlagIcon /> Report history
      </div>

      <div className="sidebar-item">
        <HelpOutlineIcon /> Help
      </div>

      <div className="sidebar-item">
        <FeedbackIcon /> Send feedback
      </div>

      <hr />

      {/* ================= FOOTER ================= */}
      <div className="sidebar-footer">
        <p>About Press Copyright</p>
        <p>Contact us Creator Advertise Developers</p>
        <p>Terms Privacy Policy & Safety</p>
        <p>How YouTube works Test new features</p>
        <p className="copyright">© 2026 YouTube</p>
      </div>

    </aside>
  );
}