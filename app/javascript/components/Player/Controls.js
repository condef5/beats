import React from "react";
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from "./icons";

function Controls({ playing, handlePlay, handlePause, prevSong, nextSong }) {
  return (
    <div className="bg-white mt-8 p-3 rounded shadow-card flex justify-center items-center">
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
