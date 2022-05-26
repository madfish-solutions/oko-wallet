import { secureCellSealWithPassphraseDecrypt64 } from 'react-native-themis';

import { getStoredValue, StoredSensetiveData } from '../utils/store.util.native';

export const decrypt = async (key: string, passwordHash: string) => {
  const encryptedData = await getStoredValue<StoredSensetiveData>(key);

  return secureCellSealWithPassphraseDecrypt64(passwordHash, encryptedData.encrypted, encryptedData.symmetricKey);
};
