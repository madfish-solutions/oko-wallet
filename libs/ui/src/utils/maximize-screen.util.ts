import { browser } from 'webextension-polyfill-ts';

export const openInFullPage = () => {
  const { search, hash } = window.location;
  const url = createUrl('fullpage.html', search, hash);
  browser.tabs.create({
    url: browser.runtime.getURL(url)
  });
};

const createUrl = (pathname = '/', search = '', hash = ''): string => {
  if (search && !search.startsWith('?')) {
    search = `?${search}`;
  }
  if (hash && !hash.startsWith('#')) {
    hash = `#${hash}`;
  }

  return `${pathname}${search}${hash}`;
};
