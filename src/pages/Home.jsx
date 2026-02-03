import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";
import videos from "../data/videos";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [category, setCategory] = useState("All");

  // Filter videos by selected category
  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter((v) => v.category === category);

  return (
    <>
      {/* Navbar */}
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="layout">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <main className="content">
          {/* Filter Chips Row */}
          <FilterBar activeCategory={category} setCategory={setCategory} />

          {/* Video Grid */}
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