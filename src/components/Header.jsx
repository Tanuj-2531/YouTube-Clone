import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, useNavigate } from "react-router-dom";

// Header component with authentication display + search
export default function Header({ toggleSidebar, searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      
      {/* LEFT SECTION */}
      <div className="header-left">
        {/* Sidebar toggle button */}
        <MenuIcon className="icon" onClick={toggleSidebar} />

        {/* YouTube Logo */}
        <div className="logo">
          <div className="logo-icon">
            <div className="play-triangle"></div>
          </div>
          <span className="logo-text">YouTube</span>
          <span className="logo-country">IN</span>
        </div>
      </div>

      {/* CENTER SECTION — SEARCH */}
      <div className="header-center">
        <div className="search-bar">
          {/* Search input connected to Home state */}
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // updates search in real-time
          />

          {/* Search button (visual only for now) */}
          <button className="search-btn">
            <SearchIcon />
          </button>
        </div>

        {/* Mic icon */}
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

        {/* Show Sign In button OR logged-in user info */}
        {!user ? (
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        ) : (
          <div className="user-info">
            {/* User avatar */}
            <img src={user.avatar} alt="avatar" className="user-avatar" />

            {/* Username */}
            <span>{user.username}</span>

            {/* Logout button */}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}