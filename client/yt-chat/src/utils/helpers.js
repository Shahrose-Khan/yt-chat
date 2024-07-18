export const capitalizeFirstLetter = (string) => {
  const words = string.split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m " : ""}${
    remainingSeconds > 0 ? remainingSeconds + "s" : ""
  }`.trim();
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString("en", {
    month: "short",
  })}, ${date.getFullYear()}`;
};

export function formatCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count;
  }
}

export function truncateTitle(title, length = 100) {
  return title.length > length ? title.substring(0, length) + "..." : title;
}
