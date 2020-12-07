import React from "react";
import { getCSRFToken } from "../utils";
import notify from "notify-space";

function getYoutubeId(url) {
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

function formatSong(song_url) {
  const id = getYoutubeId(song_url);
  return `https://youtu.be/${id}`;
}

function SongForm() {
  const [song, setSong] = React.useState("");

  async function handleSubmit(event) {
    const data = {
      type: "songs",
      attributes: {
        url: formatSong(song),
      },
    };
    event.preventDefault();
    setSong("");

    await fetch("/api/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        "X-CSRF-Token": getCSRFToken(),
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          notify(data.errors[0].title);
        } else {
          notify("Song created successfully!");
        }
      })
      .catch(() => {
        alert("There was an error. Please try again.");
      });
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
