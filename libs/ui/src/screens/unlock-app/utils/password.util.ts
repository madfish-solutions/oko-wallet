const checkTime = (time: number) => (time < 10 ? `0${time}` : time);

export const getTimeLeft = (start: number, end: number) => {
  const isPositiveTime = start + end - Date.now() < 0 ? 0 : start + end - Date.now();
  const diff = isPositiveTime / 1000;
  const seconds = Math.floor(diff % 60);
  const minutes = Math.floor(diff / 60);

  return `${checkTime(minutes)}:${checkTime(seconds)}`;
};
