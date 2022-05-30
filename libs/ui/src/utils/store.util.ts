import { SymmetricKey } from 'wasm-themis';

export interface StoredSensitiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const getStoredValue = async <StoredSensetiveData>(key: string): Promise<StoredSensetiveData> => {
  const encryptedData = localStorage.getItem(key);

  if (encryptedData !== null) {
    return JSON.parse(encryptedData);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = async (key: string, value: string) => localStorage.setItem(key, value);
