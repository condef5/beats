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

export const getCSRFToken = once(queryCSRFToken);

export function formatSeconds(seconds) {
  if (!seconds) return "00:00";
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const _seconds = seconds % 60;

  return (hours >= 1 ? [hours, minutes, _seconds] : [minutes, _seconds])
    .map((val) => `0${Math.floor(val)}`.slice(-2))
    .join(":");
}
