import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { PlayerProvider } from "./Context/PlayerContext";
import { ServerDataProvider } from "./Context/ServerDataContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Feed from "./Feed";
import Player from "./Player";

const queryClient = new QueryClient();

function App({ songs }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ServerDataProvider data={{ initialSongs: [songs] }}>
        <PlayerProvider>
          <div className="sub-grid">
            <Feed />
            <Player />
          </div>
        </PlayerProvider>
      </ServerDataProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
