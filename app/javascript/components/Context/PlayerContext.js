import React from "react";
import notify from "notify-space";

const PlayerContext = React.createContext(null);

function findIndexSong(songs, currentSong) {
  return songs.findIndex((song) => song.id == currentSong.id);
}

function PlayerProvider({ children }) {
  const [preview, setPreview] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(undefined);
  const [songs, setSongs] = React.useState([]);

  const handlePlay = () => {
    setPreview(false);
    setPlaying(true);
  };

  const handlePause = () => {
    setPreview(true);
    setPlaying(false);
  };

  const addSong = (song) => {
    if (!currentSong) {
      setCurrentSong(song);
      setPlaying(true);
    }

    if (findIndexSong(songs, song) !== -1) {
      notify("The song has already been added");
      return;
    }

    setSongs((currentSongList) => [...currentSongList, song]);
  };

  const removeSong = (song) => {
    setSongs((currentSongList) =>
      currentSongList.filter(({ id }) => song.id != id)
    );
  };

  const nextSong = () => {
    const currentSongIndex = findIndexSong(songs, currentSong);
    if (currentSongIndex + 1 == songs.length) return;

    setPlaying(true);
    setCurrentSong(songs[currentSongIndex + 1]);
  };

  const prevSong = () => {
    const currentSongIndex = findIndexSong(songs, currentSong);
    if (currentSongIndex == 0) return;
    setCurrentSong(songs[currentSongIndex - 1]);
  };

  const onErrorSong = () => {
    console.log(currentSong);
    if (!currentSong) return;

    const { name } = currentSong.attributes;

    notify(`there was an error with the ${name} song`);
    nextSong();
  };

  const value = {
    songs,
    setSongs,
    addSong,
    removeSong,
    prevSong,
    nextSong,
    currentSong,
    setCurrentSong,
    playing,
    setPlaying,
    handlePlay,
    handlePause,
    preview,
    onErrorSong,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

function usePlayerState() {
  const context = React.useContext(PlayerContext);

  if (context === undefined) {
    throw new Error("usePlayerState must be used within a PlayerProvider");
  }

  return context;
}

export { PlayerProvider, usePlayerState };
