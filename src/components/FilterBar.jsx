// Top filter buttons (minimum 6 as per requirement)
export default function FilterBar({ activeCategory, setCategory }) {
  const filters = [
    "All",
    "Music",
    "Web series",
    "T-Series",
    "Comedy clubs",
    "Dramedy",
    "Trailers",
    "Mixes",
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
          className={activeCategory === item ? "filter-chip active" : "filter-chip"}
          onClick={() => setCategory(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}