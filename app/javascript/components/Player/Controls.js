import React from "react";
import { usePlayerState } from "../Context/PlayerContext";
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from "./icons";

const disableStyles = {
  filter: "contrast(0.5)",
  pointerEvents: "none",
};

function Controls() {
  const {
    playing,
    handlePlay,
    handlePause,
    prevSong,
    nextSong,
    songs,
  } = usePlayerState();

  const styles = songs.length === 0 ? disableStyles : {};

  return (
    <div
      className="bg-white mt-8 p-3 rounded shadow-card flex justify-center items-center"
      style={styles}
    >
      <PrevIcon
        fillColor="#000"
        size="16px"
        className="cursor-pointer"
        onClick={prevSong}
      />
      <div className="bg-white rounded-full p-1 mx-3 shadow-lg cursor-pointer">
        {playing ? (
          <PauseIcon size="32px" onClick={handlePause} />
        ) : (
          <PlayIcon size="32px" onClick={handlePlay} />
        )}
      </div>
      <NextIcon
        fillColor="#000"
        size="16px"
        className="cursor-pointer"
        onClick={nextSong}
      />
    </div>
  );
}

export default Controls;
