import { ethers, Wallet } from 'ethers';

export const generateKlaytnHdAccount = (seedPhrase: string, derivationPath: string): Wallet =>
  ethers.Wallet.fromMnemonic(seedPhrase, derivationPath);
