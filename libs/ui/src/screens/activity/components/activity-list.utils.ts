import { unix } from 'dayjs';

let currentDay = '';

export const checkIsDayLabelNeeded = (timestamp: number) => {
  if (currentDay !== unix(timestamp).startOf('day').toISOString()) {
    currentDay = unix(timestamp).startOf('day').toISOString();

    return true;
  }
  currentDay = unix(timestamp).startOf('day').toISOString();

  return false;
};

export const transformTimestampToDate = (timestamp: number) => unix(timestamp).format('MMM DD YYYY').toUpperCase();

export const transformTimestampToTime = (timestamp: number) => unix(timestamp).format('HH:mm:ss');
