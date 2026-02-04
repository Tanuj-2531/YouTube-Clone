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

  // Search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Filter videos based on BOTH category and search
  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      category === "All" || video.category === category;

    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header now receives search props */}
      <Header
        toggleSidebar={() => setIsOpen(!isOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="layout">
        <Sidebar isOpen={isOpen} />

        <main className="content">
          {/* Category filters */}
          <FilterBar activeCategory={category} setCategory={setCategory} />

          {/* Video grid */}
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