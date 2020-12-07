import React from "react";
import Video from "./Video";
import Controls from "./Controls";
import Songs from "./Songs";

function findIndexSong(songs, currentSong) {
  return songs.findIndex((song) => song.id == currentSong.id);
}

function Player() {
  const [preview, setPreview] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);

  const [currentSong, setCurrentSong] = React.useState(null);
  const [songs, setSongs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/songs")
      .then((res) => res.json())
      .then(({ data }) => setSongs(data))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (songs.length > 0) {
      setCurrentSong(songs[0]);
    }
  }, [songs]);

  if (loading) return "loading...";

  const handlePlay = () => {
    setPreview(false);
    setPlaying(true);
  };

  const handlePause = () => {
    setPreview(true);
    setPlaying(false);
  };

  const nextSong = () => {
    const currentSongIndex = findIndexSong(songs, currentSong);
    if (currentSongIndex + 1 == songs.length) return;
    setCurrentSong(songs[currentSongIndex + 1]);
  };

  const prevSong = () => {
    const currentSongIndex = findIndexSong(songs, currentSong);
    if (currentSongIndex == 0) return;
    setCurrentSong(songs[currentSongIndex - 1]);
  };

  const commonProps = {
    playing,
    handlePlay,
    handlePause,
    preview,
    currentSong,
    nextSong,
  };

  return (
    <div className="player-container h-screen z-10 md:p-8">
      <Video {...commonProps} />
      <Songs
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setPlaying={setPlaying}
      />
      <Controls {...commonProps} prevSong={prevSong} />
    </div>
  );
}

export default Player;
