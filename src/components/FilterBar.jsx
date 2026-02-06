// FilterBar component shows category buttons at the top of homepage
// It receives activeCategory (currently selected) and setCategory (to change it)

export default function FilterBar({ activeCategory, setCategory }) {
  
  // List of available filter categories
  const filters = [
    "All",
    "Sports",
    "Education",
    "Spiritual",
    "Music",
    "Comedy",
    "Trailers",
    "Virat Kohli",
    "Twenty20 Cricket",
    "One-Day International",
    "Podcasts",
    "Indian pop music"
  ];

  return (
    <div className="filter-bar">
      {filters.map((item) => (
        <button
          key={item}

          // Add "active" class if this category is currently selected
          className={
            activeCategory === item
              ? "filter-chip active"
              : "filter-chip"
          }

          // When clicked, update the category state in Home.jsx
          // This triggers re-filtering of videos
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}