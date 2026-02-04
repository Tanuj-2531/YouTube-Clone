import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, useNavigate } from "react-router-dom";

// Header component with authentication display
export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <MenuIcon className="icon" onClick={toggleSidebar} />
        <div className="logo">
          <div className="logo-icon"><div className="play-triangle"></div></div>
          <span className="logo-text">MyTube</span>
          <span className="logo-country">IN</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-btn"><SearchIcon /></button>
        </div>
        <div className="mic-btn"><MicIcon /></div>
      </div>

      <div className="header-right">
        <div className="create-btn">
          <VideoCallOutlinedIcon />
          <span>Create</span>
        </div>

        <div className="notification-btn">
          <NotificationsNoneIcon />
        </div>

        {/* Show Sign In or User Info */}
        {!user ? (
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        ) : (
          <div className="user-info">
            <img src={user.avatar} alt="avatar" className="user-avatar" />
            <span>{user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}