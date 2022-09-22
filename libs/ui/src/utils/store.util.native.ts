import * as Keychain from 'react-native-keychain';

import { getKeychainOptions } from './keychain.utils.native';

export interface StoredSensitiveData {
  symmetricKey: string;
  encrypted: string;
}

export const getStoredValue = async <StoredSensitiveData>(key: string): Promise<StoredSensitiveData> => {
  const rawKeychainData = await Keychain.getGenericPassword(getKeychainOptions(key));

  if (rawKeychainData !== false) {
    return JSON.parse(rawKeychainData.password);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = async (key: string, value: string) => {
  await Keychain.setGenericPassword(key, value, getKeychainOptions(key));
};
