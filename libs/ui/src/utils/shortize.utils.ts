export const shortize = (str: string, start = 7, end = -4): string =>
  str && `${str.slice(0, start)}...${str.slice(end)}`;
