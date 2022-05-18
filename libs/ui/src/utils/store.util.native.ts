import * as Keychain from 'react-native-keychain';

import { getKeychainOptions } from './keychain.utils';

export interface StoredSensetiveData {
  symmetricKey: string;
  encrypted: string;
}

export const getStoredValue = async <StoredSensetiveData>(key: string): Promise<StoredSensetiveData | null> => {
  const rawKeychainData = await Keychain.getGenericPassword(getKeychainOptions(key));
  if (rawKeychainData !== false) {
    return JSON.parse(rawKeychainData.password);
  }

  return null;
};

export const setStoredValue = async (key: string, value: string) => {
  await Keychain.setGenericPassword(key, value, getKeychainOptions(key));
};
