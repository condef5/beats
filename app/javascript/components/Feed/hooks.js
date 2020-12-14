import { useInfiniteQuery } from "react-query";
import { useServerData } from "../Context/ServerDataContext";
import { fetchSongs } from "./api";
import { getParam } from "../../utils";

export function useQuerySong() {
  const { initialSongs } = useServerData();
  const querySong = useInfiniteQuery("songs", fetchSongs, {
    getFetchMore: (nextGroup, _allGroups) => {
      const { next } = nextGroup.links;

      if (next) {
        return getParam(next, "page[number]");
      }
    },
    initialData: initialSongs,
  });

  const songs = (querySong.data || []).flatMap((group) => group.data);

  return { ...querySong, songs };
}
