import browser, { Browser, Storage } from 'webextension-polyfill';

export const browserWithSession = browser as Browser & {
  storage: { session?: Storage.LocalStorageArea };
};
