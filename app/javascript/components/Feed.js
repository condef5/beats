import React from "react";

function SongPost({ song }) {
  const { name, image } = song.attributes;
  return (
    <div className="bg-white shadow-xl p-8 mb-8 rounded-xl">
      <div className="flex items-center">
        <div
          className="w-10 h-10 flex-shrink-0 bg-gray-200"
          style={{ borderRadius: "16px" }}
        ></div>
        <h4 className="col-span-4 mx-4 w-full">{name}</h4>
        <div className="w-4">...</div>
      </div>
      {image ? (
        <div className="mt-4">
          <img src={image} alt={`image-${name}`} />
        </div>
      ) : (
        <div className="w-full bg-gray-100 h-20 mt-4"></div>
      )}
    </div>
  );
}

function Feed() {
  const [songs, setSongs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch("/api/songs")
      .then((res) => res.json())
      .then(({ data }) => setSongs(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return "loading...";

  return (
    <div className="content p-4 md:p-0">
      <div className="m-auto h-full" style={{ maxWidth: "500px" }}>
        <div className="mb-8">
          <input
            type="text"
            className="w-full px-8 h-13 focus:shadow-cool"
            placeholder="Your link..."
            style={{ borderRadius: "40px" }}
          />
        </div>

        {songs.map((song) => (
          <SongPost key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
