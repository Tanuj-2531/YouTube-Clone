/* ================= IMPORTS ================= */
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* ================= MY CHANNEL PAGE ================= */
export default function MyChannel() {

  /* ================= NAVIGATION ================= */
  const navigate = useNavigate();

  /* ================= USER (STABLE) ================= */
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  /* ================= STATES ================= */
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFetched, setIsFetched] = useState(false);

  /* ================= FETCH USER CHANNEL ================= */
  useEffect(() => {

    if (!user || !user.username) return;
    if (isFetched) return;

    const fetchChannel = async () => {
      try {

        const res = await fetch(
          `http://localhost:5000/api/channels/user/${user.username}`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Channel fetch failed");

        setChannel(data);
        setIsFetched(true);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();

  }, [user, isFetched]);

  /* ================= FETCH CHANNEL VIDEOS ================= */
  useEffect(() => {

    if (!channel) return;

    const fetchVideos = async () => {
      try {

        const res = await fetch(
          `http://localhost:5000/api/videos/channel/${channel.channelId}`
        );

        const data = await res.json();

        setVideos(data || []);

      } catch {
        setVideos([]);
      }
    };

    fetchVideos();

  }, [channel]);

  /* ================= DELETE VIDEO ================= */
  const deleteVideo = async (videoId) => {
    try {

      await fetch(
        `http://localhost:5000/api/videos/${videoId}`,
        { method: "DELETE" }
      );

      setVideos((prev) =>
        prev.filter((v) => v.videoId !== videoId)
      );

    } catch {
      alert("Failed to delete video");
    }
  };

  /* ================= DELETE CHANNEL ================= */
  const deleteChannel = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your channel?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/channels/delete/${user.username}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Channel deleted successfully");

      navigate("/");

    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) return <h2>Loading channel...</h2>;

  /* ================= ERROR ================= */
  if (error) return <h2>{error}</h2>;

  /* ================= NO CHANNEL ================= */
  if (!channel) return <h2>No Channel Created Yet</h2>;

  /* ================= UI ================= */
  return (
    <div className="channel-page">

      {/* ===== CHANNEL BANNER ===== */}
      <img
        src={channel.channelBanner}
        alt="Channel Banner"
        className="banner"
      />

      {/* ===== CHANNEL INFO ===== */}
      <h1>{channel.channelName}</h1>
      <p>{channel.description}</p>

      {/* ===== DELETE CHANNEL BUTTON ===== */}
      <button
        onClick={deleteChannel}
        style={{
          background: "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Delete Channel
      </button>

      {/* ===== VIDEOS ===== */}
      <h3>Your Videos</h3>

      {videos.length === 0 && (
        <p>No videos uploaded yet</p>
      )}

      {videos.map((v) => (
        <div key={v.videoId} className="channel-video">

          <img
            src={v.thumbnailUrl}
            alt={v.title}
          />

          <div className="channel-video-info">
            <h4>{v.title}</h4>

            <button
              className="delete-btn"
              onClick={() => deleteVideo(v.videoId)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}