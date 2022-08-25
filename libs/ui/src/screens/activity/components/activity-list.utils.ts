import dayjs, { unix } from 'dayjs';

let currentDay = dayjs().startOf('day').toISOString();

export const checkIsDayLabelNeeded = (timestamp: number) => {
  if (currentDay === unix(timestamp).startOf('day').toISOString()) {
    return true;
  }
  currentDay = unix(timestamp).startOf('day').toISOString();

  return false;
};

export const transformTimestamp = (timestamp: number) => unix(timestamp).format('MMM DD YYYY').toUpperCase();
