import { secureCellSealWithPassphraseEncrypt64, symmetricKey64 } from 'react-native-themis';

export const encrypt = async (sensetiveData: string, passwordHash: string) => {
  const symmetricKey = await symmetricKey64();
  const encrypted = await secureCellSealWithPassphraseEncrypt64(passwordHash, sensetiveData, symmetricKey);

  return { encrypted, symmetricKey };
};
