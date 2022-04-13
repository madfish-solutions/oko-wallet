import {entropyToMnemonic} from 'bip39';
import {symmetricKey64} from 'react-native-themis';
import {Buffer} from 'buffer';

export const generateSeed = async () => {
  const key64 = await symmetricKey64();
  const entropy = Array.from(Buffer.from(key64, 'base64'));

  return entropyToMnemonic(Buffer.from(entropy.slice(0, 16)));
};
