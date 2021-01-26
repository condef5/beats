import { getCSRFToken } from "../../utils";

export async function fetchSongs({ pageParam = 1 }) {
  const response = await fetch(`/api/songs?page[number]=${pageParam}`);
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

export async function updateSong(data) {
  const response = await fetch(`/api/songs/${data.id}`, {
    method: "PATCH",
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
