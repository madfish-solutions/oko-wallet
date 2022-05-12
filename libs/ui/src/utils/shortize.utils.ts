export const shortize = (str: string, start?: number, end?: number): string =>
  str && `${str.slice(0, start ?? 7)}...${str.slice(end ?? -4)}`;
