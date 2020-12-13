import React from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { PlayerProvider } from "./Context/PlayerContext";
import Feed from "./Feed";
import Player from "./Player";

function App() {
  return (
    <>
      <PlayerProvider>
        <div className="sub-grid">
          <Feed />
          <Player />
        </div>
      </PlayerProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
