import React from "react";
import { useInfiniteQuery } from "react-query";
import Song from "./Song";
import SongForm from "./SongForm";
import { fetchSongs } from "./api";
import { getParam } from "../../utils";

function useQuerySong() {
  const querySong = useInfiniteQuery("songs", fetchSongs, {
    getFetchMore: (nextGroup, _allGroups) => {
      const { next } = nextGroup.links;

      if (next) {
        return getParam(next, "page[number]");
      }
    },
  });

  const songs = (querySong.data || []).flatMap((group) => group.data);

  return { ...querySong, songs };
}

function HeaderCountSongs() {
  const { songs, isLoading } = useQuerySong();

  return (
    <h3 className="mb-4">{isLoading ? "..." : songs.length} loaded songs</h3>
  );
}

function SongList() {
  const querySong = useQuerySong();

  if (querySong.isLoading) return "loading...";

  if (querySong.isError)
    return <p className="text-red-500">{querySong.error.message}</p>;

  return (
    <>
      {querySong.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
      {querySong.canFetchMore ? (
        <button
          onClick={() => querySong.fetchMore()}
          className="bg-white text-gray-800 p-2 w-full rounded tracking-wide font-medium text-sm uppercase "
        >
          Load more {querySong.isFetchingMore && "..."}
        </button>
      ) : null}
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
