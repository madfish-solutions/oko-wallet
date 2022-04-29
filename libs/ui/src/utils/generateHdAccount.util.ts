import { TEZOS_BIP44_COINTYPE, ETHER_BIP44_COINTYPE } from '../constants/cointype';

import { generateKlaytnHdAccount } from './generateKlaytnHdAccount.util';
import { generateTezosHdAccount } from './generateTezosHdAccount.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, coin] = derivationPath.split("'/");

  switch (coin) {
    case ETHER_BIP44_COINTYPE:
      return generateKlaytnHdAccount(seedPhrase, derivationPath);
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return {};
  }
};
