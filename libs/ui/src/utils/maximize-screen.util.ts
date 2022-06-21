import { browser } from 'webextension-polyfill-ts';

export function openInFullPage() {
  const { search, hash } = window.location;
  const url = createUrl('index.html', search, hash);
  browser.tabs.create({
    url: browser.runtime.getURL(url)
  });
}

export function createUrl(pathname = '/', search = '', hash = ''): string {
  if (search && !search.startsWith('?')) {
    search = `?${search}`;
  }
  if (hash && !hash.startsWith('#')) {
    hash = `#${hash}`;
  }

  return `${pathname}${search}${hash}`;
}
