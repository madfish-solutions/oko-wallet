import { secureCellSealWithPassphraseDecrypt64 } from 'react-native-themis';
import { getStoredValue } from 'shared';

interface StoredSensitiveData {
  symmetricKey: string;
  encrypted: string;
}

export const decrypt = async (key: string, passwordHash: string) => {
  const encryptedData = await getStoredValue<StoredSensitiveData>(key);

  return secureCellSealWithPassphraseDecrypt64(passwordHash, encryptedData.encrypted, encryptedData.symmetricKey);
};
