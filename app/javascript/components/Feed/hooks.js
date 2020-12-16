import { useInfiniteQuery } from "react-query";
import { useServerData } from "../Context/ServerDataContext";
import { fetchSongs } from "./api";
import { getParam } from "../../utils";

export function useQuerySong() {
  const { initialSongs } = useServerData();
  const querySong = useInfiniteQuery("songs", fetchSongs, {
    getNextPageParam: (nextPage) => {
      const { next } = nextPage.links;

      if (next) {
        return getParam(next, "page[number]");
      }
    },
    initialData: { pages: initialSongs },
    keepPreviousData: true,
  });

  const songs = (querySong.data?.pages || []).flatMap((group) => group.data);

  return { ...querySong, songs };
}
