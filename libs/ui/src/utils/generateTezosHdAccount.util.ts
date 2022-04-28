import { InMemorySigner } from '@taquito/signer';
import { b58cencode, prefix } from '@taquito/utils';
import { mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { derivePath } from 'ed25519-hd-key';

const getKeys = (privateKey: string) =>
  InMemorySigner.fromSecretKey(privateKey).then(signer =>
    Promise.all([signer.publicKey(), signer.publicKeyHash(), signer.secretKey()])
  );

const deriveSeed = (seed: Buffer, derivationPath: string) => {
  try {
    const { key } = derivePath(derivationPath, seed.toString('hex'));

    return key;
  } catch (_err) {
    throw new Error('Invalid derivation path');
  }
};

const seedToPrivateKey = (seed: Buffer, derivationPath?: string) => {
  const derivedSeed = derivationPath !== undefined ? deriveSeed(seed, derivationPath) : seed;

  return b58cencode(derivedSeed, prefix.edsk2);
};

export const generateTezosHdAccount = async (seedPhrase: string, accountIndex = 0) => {
  const seed = mnemonicToSeedSync(seedPhrase);
  const [publicKey, address, privateKey] = await getKeys(seedToPrivateKey(seed, `m/44'/1729'/${accountIndex}'/0'`));

  return {
    publicKey,
    address,
    privateKey
  };
};
