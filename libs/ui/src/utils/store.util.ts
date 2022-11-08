import { SymmetricKey } from 'wasm-themis';
import { browser } from 'webextension-polyfill-ts';

export interface StoredSensitiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const getStoredValue = async <StoredSensitiveData>(key: string): Promise<StoredSensitiveData> => {
  const encryptedData = await browser.storage.local.get(key);

  if (encryptedData !== null) {
    return JSON.parse(encryptedData[key]);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = (key: string, value: string) => browser.storage.local.set({ [key]: value });
