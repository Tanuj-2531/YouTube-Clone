/* ================= IMPORTS ================= */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import banner from "../assets/channelbar/channelBanner.png";

/* ================= CREATE CHANNEL PAGE ================= */
export default function CreateChannel() {

  /* ================= USER + NAVIGATION ================= */
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  /* ================= FORM STATES ================= */
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  /* ================= UI STATES ================= */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= CREATE CHANNEL FUNCTION ================= */
  const createChannel = async () => {

    /* ===== VALIDATION ===== */
    if (!name.trim()) {
      setError("Channel name is required");
      return;
    }

    if (!user) {
      setError("Please login first");
      return;
    }

    try {

      setLoading(true);
      setError("");


      /* ===== CHANNEL DATA ===== */
      const channelData = {
        channelId: uuid(),
        channelName: name,
        description: desc,
        owner: user.username,
        channelBanner: banner,
        subscribers: 0,
        videos: [],
      };

      console.log("SENDING CHANNEL DATA:", channelData);

      /* ===== API CALL ===== */
      const res = await fetch(
        "http://localhost:5000/api/channels/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(channelData)
        }
      );

      /* ===== NETWORK CHECK ===== */
      if (!res) {
        throw new Error("Backend not reachable");
      }

      const data = await res.json();

      console.log("CHANNEL RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to create channel");
      }

      /* ===== SUCCESS ===== */
      navigate("/my-channel");

    } catch (err) {

      console.log("CREATE CHANNEL ERROR:", err);
      setError(err.message || "Failed to create channel");

    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="create-channel">

      <h2>Create Channel</h2>

      {/* ===== ERROR MESSAGE ===== */}
      {error && <p className="error-text">{error}</p>}

      {/* ===== CHANNEL NAME ===== */}
      <input
        placeholder="Channel Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* ===== DESCRIPTION ===== */}
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      {/* ===== SUBMIT BUTTON ===== */}
      <button
        onClick={createChannel}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Channel"}
      </button>

    </div>
  );
}