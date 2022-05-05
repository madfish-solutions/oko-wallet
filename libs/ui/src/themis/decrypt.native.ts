import { secureCellSealWithPassphraseDecrypt64 } from 'react-native-themis';

import { getStoredValue, StoredSensetiveData } from '../utils/shelter.util';

export const decrypt = async (passwordHash: string, key: string) => {
  const encryptedData = await getStoredValue<StoredSensetiveData>(key);
  if (encryptedData !== undefined) {
    const decrypted = await secureCellSealWithPassphraseDecrypt64(
      passwordHash,
      encryptedData.encrypted as string,
      encryptedData.symmetricKey as string
    );

    return decrypted;
  }
};
