import React from "react";
import { useQuery } from "react-query";
import Song from "./Song";
import SongForm from "./SongForm";
import { fetchSongs } from "./api";

function useQuerySong() {
  return useQuery("songs", fetchSongs);
}

function HeaderCountSongs() {
  const querySong = useQuerySong();

  return <h3 className="mb-4">{querySong.data?.data?.length} loaded songs</h3>;
}

function SongList() {
  const querySong = useQuerySong();

  if (querySong.isLoading) return "loading...";

  if (querySong.isError)
    return <p className="text-red-500">{querySong.error.message}</p>;

  return (
    <>
      {querySong.data.data.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </>
  );
}

function Feed() {
  return (
    <div className="content p-4 md:py-8">
      <div className="w-1/2">
        <div className="m-auto" style={{ maxWidth: "400px" }}>
          <SongForm />
          <HeaderCountSongs />
          <SongList />
        </div>
      </div>
    </div>
  );
}

export default Feed;
