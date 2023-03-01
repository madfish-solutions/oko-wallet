import { isDefined } from '@rnw-community/shared';

import { LocalStorage } from './local-storage.util';

export const getStoredValue = async <T>(key: string): Promise<T> => {
  const encryptedData: string | null = await LocalStorage.getItem(key);

  if (isDefined(encryptedData)) {
    return JSON.parse(encryptedData);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = (key: string, value: string) => LocalStorage.setItem(key, value);
