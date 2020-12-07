import React from "react";
import ReactPlayer from "react-player";
import { PlayIcon, LoadingIcon } from "./icons";

function Video({
  playing,
  handlePlay,
  handlePause,
  preview,
  currentSong,
  nextSong,
}) {
  const [loading, setLoading] = React.useState(true);
  if (!currentSong) return "loading...";

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

export default Video;
