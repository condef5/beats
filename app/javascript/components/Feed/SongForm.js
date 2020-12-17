import React from "react";
import { useMutation, useQueryClient } from "react-query";
import notify from "notify-space";
import { createSong } from "./api";
import { formatSong, getSongOptimistic } from "../../utils";

function SongForm() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(createSong, {
    onMutate: async (newSong) => {
      await queryClient.cancelQueries("songs");
      const previousSongs = queryClient.getQueryData("songs");

      queryClient.setQueryData("songs", (oldSongs) => {
        const optimisticSong = getSongOptimistic(newSong);
        const [firstPage, ...restPages] = oldSongs.pages;
        const newPages = [
          { ...firstPage, data: [optimisticSong, ...firstPage.data] },
          ...restPages,
        ];

        return { ...oldSongs, pages: newPages };
      });

      return { previousSongs };
    },
    onError: (_err, _newSong, context) => {
      queryClient.setQueryData("songs", context.previousSongs);
    },
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
