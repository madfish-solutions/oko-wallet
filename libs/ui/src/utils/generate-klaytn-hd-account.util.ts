import { ethers } from 'ethers';

export const generateEthereumHdAccount = (seedPhrase: string, derivationPath: string) =>
  ethers.Wallet.fromMnemonic(seedPhrase, derivationPath);
