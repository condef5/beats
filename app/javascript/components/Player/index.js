import React from "react";
import Video from "./Video";
import Controls from "./Controls";
import Songs from "./Songs";

function Player() {
  return (
    <div className="player-container h-screen z-10 md:p-8">
      <Video />
      <Songs />
      <Controls />
    </div>
  );
}

export default Player;
