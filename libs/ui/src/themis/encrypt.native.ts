import { secureCellSealWithPassphraseEncrypt64, symmetricKey64 } from 'react-native-themis';

export const encrypt = async (sensitiveData: string, passwordHash: string) => {
  const symmetricKey = await symmetricKey64();
  const encrypted = await secureCellSealWithPassphraseEncrypt64(passwordHash, sensitiveData, symmetricKey);

  return { encrypted, symmetricKey };
};
