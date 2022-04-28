import { ethers } from 'ethers';

export const generateKlaytnHdAccount = (seedPhrase: string, accountIndex = 0) =>
  ethers.Wallet.fromMnemonic(seedPhrase, `m/44'/60'/${accountIndex}'/0'`);
