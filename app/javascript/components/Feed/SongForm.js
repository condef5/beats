import React from "react";
import { useMutation, useQueryClient } from "react-query";
import notify from "notify-space";
import { createSong } from "./api";
import { formatSong, getSongOptimistic } from "../../utils";

function SongForm() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(createSong, {
    onMutate: async (song) => {
      await queryClient.cancelQueries("songs");

      const previousGroupSongs = queryClient.getQueryData("songs");

      queryClient.setQueryData("songs", (oldSongs) => {
        const newPages = [
          { data: [getSongOptimistic(song)] },
          ...oldSongs.pages,
        ];
        return { ...oldSongs, pages: newPages };
      });

      return () => queryCache.setQueryData("songs", previousGroupSongs);
    },
    onError: (_error, _newSong, rollback) => rollback(),
    onSettled: () => {
      queryClient.invalidateQueries("songs");
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
      const createdSong = await mutateAsync(data);

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
