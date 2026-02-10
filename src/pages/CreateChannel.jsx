import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function CreateChannel() {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createChannel = async () => {

    const channelData = {
      channelId: uuid(),
      channelName: name,
      description: desc,
      owner: user.userId,
      channelBanner: "https://picsum.photos/1200/300"
    };

    await fetch("http://localhost:5000/api/channels/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(channelData)
    });

    navigate("/my-channel");
  };

  return (
    <div className="create-channel">
      <h2>Create Channel</h2>

      <input
        placeholder="Channel Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />

      <button onClick={createChannel}>
        Create Channel
      </button>
    </div>
  );
}