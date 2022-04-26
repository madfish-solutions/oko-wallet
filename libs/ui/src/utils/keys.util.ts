import { entropyToMnemonic } from 'bip39';
import { Buffer } from 'buffer';

import { symmetricKey } from '../themis/symmetric-key';

export const generateSeed = async () => {
  const key = await symmetricKey();
  const entropy = Array.from(Buffer.from(key, 'base64'));

  return entropyToMnemonic(Buffer.from(entropy.slice(0, 16)));
};
