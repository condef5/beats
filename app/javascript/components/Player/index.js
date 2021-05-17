import React from "react";
import Video from "./VideoPlayer";
import Controls from "./Controls";
import Songs from "./Songs";

const playerStyles = {
  height: 'fit-content',
  top: '80px',
  width: "min(520px, 50%)"
};

function Player() {
  return (
    <div className="z-10 md:p-8 top-0 sticky" style={playerStyles}>
      <Video />
      <Songs />
      <Controls />
    </div>
  );
}

export default Player;
