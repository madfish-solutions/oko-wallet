import { browser } from 'webextension-polyfill-ts';

import { createUrl } from './url.util';

export const openMaximiseScreen = () => {
  const { search, hash } = window.location;
  const url = createUrl('fullpage.html', search, hash);
  browser.tabs.create({
    url: browser.runtime.getURL(url)
  });
};
