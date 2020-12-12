import React from "react";
import { usePlayerState } from "../Context/PlayerContext";

function Song({ song }) {
  const { name, image } = song.attributes;
  const { addSong } = usePlayerState();

  return (
    <div
      className="bg-white shadow-xl p-6 mb-8 rounded-xl"
      onClick={() => addSong(song)}
    >
      <div className="flex items-center">
        <div
          className="w-10 h-10 flex-shrink-0 bg-gray-200"
          style={{ borderRadius: "16px" }}
        ></div>
        <h4 className="col-span-4 mx-4 w-full font-medium text-gray-800 text-sm">
          {name}
        </h4>
        <div className="w-4">...</div>
      </div>
      {image ? (
        <div className="mt-4">
          <img
            src={image}
            alt={`image-${name}`}
            className="object-cover w-full h-50"
          />
        </div>
      ) : (
        <div className="w-full bg-gray-100 h-20 mt-4"></div>
      )}
    </div>
  );
}

export default Song;
