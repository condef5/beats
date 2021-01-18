function once(fn) {
  let result = null;

  return (...args) => {
    if (result) return result;
    result = fn(args);
    return result;
  };
}

function queryCSRFToken() {
  const metaTag = document.querySelector("meta[name=csrf-token]");
  return metaTag ? metaTag.content : null;
}

function getYoutubeId(url) {
  url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

// -------exports-------

export function getSongOptimistic(song) {
  const image = `http://i3.ytimg.com/vi/${getYoutubeId(
    song.attributes.url
  )}/maxresdefault.jpg`;

  return {
    id: new Date().toISOString(),
    attributes: {
      name: "Loading name...",
      image,
      url: song.attributes.url,
    },
  };
}

export function formatSeconds(seconds) {
  if (!seconds) return "00:00";
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const _seconds = seconds % 60;

  return (hours >= 1 ? [hours, minutes, _seconds] : [minutes, _seconds])
    .map((val) => `0${Math.floor(val)}`.slice(-2))
    .join(":");
}

export function formatSong(song_url) {
  const id = getYoutubeId(song_url);
  return `https://youtu.be/${id}`;
}

export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function getParam(url, paramKey) {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);
  return params.get(paramKey);
}

export const getCSRFToken = once(queryCSRFToken);
