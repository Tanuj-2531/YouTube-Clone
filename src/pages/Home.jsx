import { useState } from "react";

// UI Components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

// Static video data
import videos from "../data/videos";

// Home Page (only accessible after login via ProtectedRoute)
export default function Home() {
  // Controls whether sidebar is open or collapsed
  const [isOpen, setIsOpen] = useState(true);

  // Stores currently selected filter category
  const [category, setCategory] = useState("All");

  // Filter videos based on selected category
  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter((v) => v.category === category);

  return (
    <>
      {/* Top Navbar (also shows user info if logged in) */}
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="layout">
        {/* Sidebar navigation */}
        <Sidebar isOpen={isOpen} />

        {/* Main content area */}
        <main className="content">
          {/* Category filter buttons */}
          <FilterBar activeCategory={category} setCategory={setCategory} />

          {/* Video grid display */}
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}