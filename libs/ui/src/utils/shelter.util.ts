import { SymmetricKey } from 'wasm-themis';

export interface StoredSensetiveData {
  symmetricKey: SymmetricKey | string;
  encrypted: object | string;
}

export const getStoredValue = async <T>(key: string): Promise<T | undefined> => {
  try {
    const encryptedData = localStorage.getItem(key);

    if (encryptedData !== null) {
      return JSON.parse(encryptedData);
    }
  } catch (e) {
    console.log(e);
  }
};

export const setStoredValue = async (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
