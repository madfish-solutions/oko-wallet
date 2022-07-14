import { mnemonicToSeed } from 'bip39';
import { utils, Wallet } from 'ethers';

export const generateEvmHdAccount = async (seedPhrase: string, derivationPath: string): Promise<Wallet> => {
  const seed = await mnemonicToSeed(seedPhrase);
  const hdNode = utils.HDNode.fromSeed(seed);
  const derivedHdNode = hdNode.derivePath(derivationPath);

  return new Wallet(derivedHdNode);
};
