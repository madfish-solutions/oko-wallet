import { SymmetricKey } from 'wasm-themis';

export interface StoredSensitiveData {
  symmetricKey: SymmetricKey;
  encrypted: object;
}

export const getStoredValue = async <StoredSensitiveData>(key: string): Promise<StoredSensitiveData | null> => {
  const encryptedData = localStorage.getItem(key);

  return encryptedData !== null ? JSON.parse(encryptedData) : null;
};

export const setStoredValue = async (key: string, value: string) => localStorage.setItem(key, value);
