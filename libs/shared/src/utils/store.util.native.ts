import * as Keychain from 'react-native-keychain';

import { getKeychainOptions } from './keychain.util.native';

export const getStoredValue = async <T>(key: string): Promise<T> => {
  const rawKeychainData = await Keychain.getGenericPassword(getKeychainOptions(key));

  if (rawKeychainData !== false) {
    return JSON.parse(rawKeychainData.password);
  }

  throw Error(`No record in Keychain [${key}]`);
};

export const setStoredValue = async (key: string, value: string) => {
  await Keychain.setGenericPassword(key, value, getKeychainOptions(key));
};
