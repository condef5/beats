import React from "react";
import { formatSeconds } from "../../utils";

function Songs({ songs, currentSong, setCurrentSong, setPlaying }) {
  return (
    <div
      className="bg-white mt-8 p-3 rounded shadow-card overflow-y-auto"
      style={{ maxHeight: "460px" }}
    >
      {songs.map((song) => (
        <li
          key={song.id}
          className="flex justify-between py-2 text-sm cursor-pointer"
          style={{
            letterSpacing: "0.1px",
            color: song.id == currentSong.id && "#f9556bad",
          }}
          onClick={() => {
            setCurrentSong(song);
            setPlaying(true);
          }}
        >
          <span className="overflow-ellipsis overflow-hidden">
            {song.attributes.name}
          </span>
          <div>{formatSeconds(song.attributes.duration)}</div>
        </li>
      ))}
    </div>
  );
}

export default Songs;
