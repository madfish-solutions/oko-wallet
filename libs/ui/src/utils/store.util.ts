import { SymmetricKey } from 'wasm-themis';

export interface StoredSensetiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const getStoredValue = async <StoredSensetiveData>(key: string): Promise<StoredSensetiveData | null> => {
  const encryptedData = localStorage.getItem(key);

  return encryptedData !== null ? JSON.parse(encryptedData) : null;
};

export const setStoredValue = async (key: string, value: string) => localStorage.setItem(key, value);
