import React from "react";
import { formatSeconds } from "../../utils";
import { usePlayerState } from "../Context/PlayerContext";

function Songs() {
  const { songs, currentSong, setCurrentSong, setPlaying } = usePlayerState();

  if (songs.length === 0) {
    return (
      <div className="bg-white mt-8 p-3 text-gray-700 rounded shadow-card">
        No song has been added yet - ʕ◉ᴥ◉ʔ
      </div>
    );
  }

  return (
    <div
      className="bg-white mt-8 p-3 text-gray-700 rounded shadow-card overflow-y-auto"
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
          <div className="w-13 flex-shrink-0 text-right ml-1">
            {formatSeconds(song.attributes.duration)}
          </div>
        </li>
      ))}
    </div>
  );
}

export default Songs;
