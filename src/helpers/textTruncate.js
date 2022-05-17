export const textTruncate = (string) => {
  if (string.length > 10) return string.substring(0, 10) + "...";
  else return string;
};

export const textTruncateMore = (string) => {
  if (string?.length > 20) return string.substring(0, 20) + "...";
  else return string;
};
