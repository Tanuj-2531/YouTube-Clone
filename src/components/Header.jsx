import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Header with logo, search bar and icons
export default function Header({ toggleSidebar }) {
  return (
    <header className="header">

      {/* LEFT SECTION */}
      <div className="header-left">
        <MenuIcon className="icon" onClick={toggleSidebar} />

        <div className="logo">
          <div className="logo-icon">
            <div className="play-triangle"></div>
          </div>
          <span className="logo-text">YouTube</span>
          <span className="logo-country">IN</span>
        </div>
      </div>

      {/* CENTER SECTION */}
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn">
            <SearchIcon />
          </button>
        </div>

        <div className="mic-btn">
          <MicIcon />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="header-right">
        <div className="create-btn">
          <VideoCallOutlinedIcon />
          <span>Create</span>
        </div>

        <div className="notification-btn">
          <NotificationsNoneIcon />
        </div>

        <div className="profile-btn">
          <AccountCircleIcon />
        </div>
      </div>

    </header>
  );
}