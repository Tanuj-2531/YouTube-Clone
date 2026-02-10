import { useEffect, useState } from "react";

export default function MyChannel() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/channels/user/${user.userId}`)
      .then(res => res.json())
      .then(data => setChannel(data));
  }, []);

  useEffect(() => {
    if (!channel) return;

    fetch(`http://localhost:5000/api/videos/channel/${channel.channelId}`)
      .then(res => res.json())
      .then(setVideos);

  }, [channel]);

  const deleteVideo = async (videoId) => {
    await fetch(`http://localhost:5000/api/videos/${videoId}`, {
      method: "DELETE"
    });

    setVideos(videos.filter(v => v.videoId !== videoId));
  };

  if (!channel) return <h2>No Channel Yet</h2>;

  return (
    <div className="channel-page">

      <img src={channel.channelBanner} className="banner" />

      <h1>{channel.channelName}</h1>
      <p>{channel.description}</p>

      <h3>Your Videos</h3>

      {videos.map(v => (
        <div key={v.videoId} className="channel-video">

          <img src={v.thumbnailUrl} />

          <div>
            <h4>{v.title}</h4>

            <button onClick={() => deleteVideo(v.videoId)}>
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}