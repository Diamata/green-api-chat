// Messages time
export const getTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
    hour24: true,
  }).toLowerCase();
};



