import React from "react";
import Feed from "./Feed";
import Player from "./Player";
import { PlayerProvider } from "./Context/PlayerContext";

function App() {
  return (
    <PlayerProvider>
      <div className="sub-grid">
        <Feed />
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default App;
