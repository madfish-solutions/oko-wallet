import { Storage } from 'redux-persist';
import { browser } from 'webextension-polyfill-ts';

export const LocalStorage: Storage = {
  getItem: key => browser.storage.local.get(key).then(value => value[key]),
  setItem: (key, value) => browser.storage.local.set({ [key]: value }),
  removeItem: key => browser.storage.local.remove(key)
};
