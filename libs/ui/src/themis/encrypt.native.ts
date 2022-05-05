import { secureCellSealWithPassphraseEncrypt64, symmetricKey64 } from 'react-native-themis';

export const encrypt = async (seed: string, passwordHash: string) => {
  const symmetricKey = await symmetricKey64();
  const encrypted = await secureCellSealWithPassphraseEncrypt64(passwordHash, seed, symmetricKey);

  return { encrypted, symmetricKey };
};
