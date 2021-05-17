import React from "react";
import Video from "./VideoPlayer";
import Controls from "./Controls";
import Songs from "./Songs";

function Player() {
  return (
    <div className="player-container z-10 md:p-8 top-0 sticky" style={{ height: 'fit-content', top: '80px' }}>
      <Video />
      <Songs />
      <Controls />
    </div>
  );
}

export default Player;
