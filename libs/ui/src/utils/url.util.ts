export const createUrl = (pathname = '/', search = '', hash = ''): string => {
  if (search && !search.startsWith('?')) {
    search = `?${search}`;
  }
  if (hash && !hash.startsWith('#')) {
    hash = `#${hash}`;
  }

  return `${pathname}${search}${hash}`;
};
