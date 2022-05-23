import { ethers, Wallet } from 'ethers';

export const generateEvmHdAccount = (seedPhrase: string, derivationPath: string): Wallet =>
  ethers.Wallet.fromMnemonic(seedPhrase, derivationPath);
