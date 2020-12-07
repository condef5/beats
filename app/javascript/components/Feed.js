import React from "react";
import Song from "./Song";
import SongForm from "./SongForm";

function Feed() {
  const [songs, setSongs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function getSongs() {
    setLoading(true);
    fetch("/api/songs")
      .then((res) => res.json())
      .then(({ data }) => setSongs(data))
      .finally(() => setLoading(false));
  }

  React.useEffect(() => {
    getSongs();
  }, []);

  if (loading) return "loading...";

  return (
    <div className="content p-4 md:py-8">
      <div className="w-1/2">
        <div className="m-auto" style={{ maxWidth: "400px" }}>
          <SongForm />
          {songs.map((song) => (
            <Song key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
