import React from "react";
import ReactPlayer from "react-player";
import { usePlayerState } from "../Context/PlayerContext";
import { PlayIcon, LoadingIcon } from "./icons";

function VideoPlayer() {
  const {
    playing,
    handlePlay,
    handlePause,
    preview,
    currentSong,
    nextSong,
  } = usePlayerState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
  }, [currentSong.id]);

  const { url, image } = currentSong.attributes;

  return (
    <div className="relative bg-white p-3">
      <ReactPlayer
        className="video-wrapper"
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        onPlay={handlePlay}
        onPause={handlePause}
        onStart={() => setLoading(false)}
        onEnded={nextSong}
      />
      <div
        className="video-overlay absolute inset-0 p-3 rounded shadow-card"
        style={{ transform: preview ? "scale(1)" : "scale(0)" }}
        onClick={handlePlay}
      >
        <img src={image} alt="image-overlay" className="w-full" />
        <div className="play-icon">
          {playing && loading ? (
            <LoadingIcon
              fillColor="#fff"
              stroke="#fff"
              width={"52px"}
              height={"52px"}
              className="rotating"
            />
          ) : (
            <PlayIcon
              fillColor="#fff"
              stroke="#fff"
              width={"52px"}
              height={"52px"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Video() {
  const { currentSong } = usePlayerState();

  if (!currentSong)
    return (
      <div className="relative bg-white p-3 h-60 rounded shadow-card"></div>
    );

  return <VideoPlayer />;
}

export default Video;
