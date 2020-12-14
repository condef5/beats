import React from "react";
import { ReactQueryDevtools } from "react-query-devtools";
import { PlayerProvider } from "./Context/PlayerContext";
import { ServerDataProvider } from "./Context/ServerDataContext";
import Feed from "./Feed";
import Player from "./Player";

function App({ songs }) {
  return (
    <>
      <ServerDataProvider data={{ initialSongs: [songs] }}>
        <PlayerProvider>
          <div className="sub-grid">
            <Feed />
            <Player />
          </div>
        </PlayerProvider>
      </ServerDataProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default App;
