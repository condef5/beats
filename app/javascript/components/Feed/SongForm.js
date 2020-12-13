import React from "react";
import { useMutation, queryCache } from "react-query";
import notify from "notify-space";
import { createSong } from "./api";
import { formatSong } from "../../utils";

function SongForm() {
  const [mutate] = useMutation(createSong, {
    onSuccess: () => {
      queryCache.invalidateQueries("songs");
    },
  });
  const [song, setSong] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!song) return;

    const data = {
      type: "songs",
      attributes: {
        url: formatSong(song),
      },
    };

    setSong("");

    try {
      const createdSong = await mutate(data);

      if (createdSong.errors) {
        notify(createdSong.errors[0].title);
      } else {
        notify("Song created successfully!");
      }
    } catch {
      alert("There was an error. Please try again.");
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          className="w-full px-8 h-13 focus:shadow-cool"
          placeholder="Your song link..."
          style={{ borderRadius: "40px" }}
          onChange={(event) => setSong(event.target.value)}
          value={song}
        />
      </form>
    </div>
  );
}

export default SongForm;
