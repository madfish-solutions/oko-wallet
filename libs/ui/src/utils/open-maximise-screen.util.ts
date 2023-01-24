import { tabs, runtime } from 'webextension-polyfill';

import { createUrl } from './url.util';

export const openFullViewPage = () => {
  const { search, hash } = window.location;

  const url = createUrl('fullpage.html', search, hash);

  tabs.create({
    url: runtime.getURL(url)
  });
};
