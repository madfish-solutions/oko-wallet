import {entropyToMnemonic} from 'bip39';
import {symmetricKey64} from 'react-native-themis';
import {Buffer} from 'buffer';
import { derivePath } from 'ed25519-hd-key';

export const generateSeed = async () => {
  const key64 = await symmetricKey64();
  const entropy = Array.from(Buffer.from(key64, 'base64'));

  return entropyToMnemonic(Buffer.from(entropy.slice(0, 16)));
};

export const deriveSeed = (seed: Buffer, derivationPath: string) => {
  try {
    const { key } = derivePath(derivationPath, seed.toString('hex'));

    return key;
  } catch (_err) {
    throw new Error('Invalid derivation path');
  }
};

// export const seedToPrivateKey = (seed: Buffer, derivationPath: string) => {
//   const derivedSeed = derivationPath ? deriveSeed(seed, derivationPath) : seed;

//   return b58cencode(derivedSeed.slice(0, 32), prefix.edsk2);
// };
