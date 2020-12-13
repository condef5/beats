import { getCSRFToken } from "../../utils";

export async function fetchSongs(key, page = 1) {
  const response = await fetch(`/api/songs?page[number]=${page}`);
  return response.json();
}

export async function createSong(data) {
  const response = await fetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getCSRFToken(),
    },
    body: JSON.stringify({
      data,
    }),
  });
  return response.json();
}
