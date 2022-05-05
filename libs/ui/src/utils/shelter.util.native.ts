import * as Keychain from 'react-native-keychain';
import { secureCellSealWithPassphraseEncrypt64, secureCellSealWithPassphraseDecrypt64 } from 'react-native-themis';

import { getKeychainOptions } from './keychain.utils';

export const getStoredValue = async (key: string) => {
  try {
    const encryptedData = await Keychain.getGenericPassword(getKeychainOptions(key));
    if (encryptedData !== false) {
      return JSON.parse(encryptedData.password);
    } else {
      throw Error(`No record in Keychain [${key}]`);
    }
  } catch (e) {
    console.log(e);
  }
};

export const setStoredValue = async (key: string, value: string) => {
  try {
    await Keychain.setGenericPassword(key, value, getKeychainOptions(key));
  } catch (e) {
    console.log(e);
  }
};

export const encrypt = async (seed: string, passwordHash: string) => {
  const encrypted = await secureCellSealWithPassphraseEncrypt64(passwordHash, seed);

  return encrypted;
};

export const decrypt = async (passwordHash: string, key: string) => {
  const seedPhrase = await getStoredValue(key);
  if (seedPhrase !== undefined) {
    const decrypted = await secureCellSealWithPassphraseDecrypt64(passwordHash, seedPhrase);

    return decrypted;
  }
};
