import { InMemorySigner } from '@taquito/signer';
import { b58cencode, prefix } from '@taquito/utils';
import { mnemonicToSeedSync } from 'bip39';
import { Buffer } from 'buffer';
import { derivePath } from 'ed25519-hd-key';

export const getKeys = (privateKey: string) =>
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

const seedToPrivateKey = (seed: Buffer, derivationPath: string) =>
  b58cencode(deriveSeed(seed, derivationPath), prefix.edsk2);

export const generateTezosHdAccount = async (mnemonic: string, derivationPath: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const [publicKey, address, privateKey] = await getKeys(seedToPrivateKey(seed, derivationPath));

  return {
    publicKey,
    address,
    privateKey
  };
};
