import { browserWithSession } from './browser.utils';

export const openFullPage = () => {
  browserWithSession.tabs.create({
    url: browserWithSession.runtime.getURL('fullpage.html')
  });
};
