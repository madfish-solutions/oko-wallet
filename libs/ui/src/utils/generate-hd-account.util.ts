import { TEZOS_BIP44_COINTYPE, ETHER_BIP44_COINTYPE } from '../constants/cointype';

import { generateKlaytnHdAccount } from './generate-klaytn-hd-account.util';
import { generateTezosHdAccount } from './generate-tezos-hd-account.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, , cointype] = derivationPath.split('/');
  console.log('ccc', cointype.replace("'", ''));
  switch (cointype.replace("'", '')) {
    case ETHER_BIP44_COINTYPE:
      return generateKlaytnHdAccount(seedPhrase, derivationPath);
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return {};
  }
};
