import { isDefined } from '@rnw-community/shared';
import { SymmetricKey } from 'wasm-themis';

import { LocalStorage } from './local-storage.util';

export interface StoredSensitiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const getStoredValue = async <StoredSensitiveData>(key: string): Promise<StoredSensitiveData> => {
  const encryptedData = await LocalStorage.getItem(key);

  if (isDefined(encryptedData)) {
    return JSON.parse(encryptedData);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = (key: string, value: string) => LocalStorage.setItem(key, value);
