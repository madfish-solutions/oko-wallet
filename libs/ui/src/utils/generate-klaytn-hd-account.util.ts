import { ethers } from 'ethers';

export const generateKlaytnHdAccount = (seedPhrase: string, derivationPath: string) =>
  ethers.Wallet.fromMnemonic(seedPhrase, derivationPath);
