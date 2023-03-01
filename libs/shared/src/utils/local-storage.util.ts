import { Storage } from 'redux-persist';
import { storage } from 'webextension-polyfill';

export const LocalStorage: Storage = {
  getItem: key => storage.local.get(key).then(value => value[key]),
  setItem: (key, value) => storage.local.set({ [key]: value }),
  removeItem: key => storage.local.remove(key)
};
