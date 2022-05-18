import { TEZOS_BIP44_COINTYPE } from '../constants/cointype';

import { generateKlaytnHdAccount } from './generate-klaytn-hd-account.util';
import { generateTezosHdAccount } from './generate-tezos-hd-account.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, , cointype] = derivationPath.split('/');
  switch (cointype.replace("'", '')) {
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return generateKlaytnHdAccount(seedPhrase, derivationPath);
  }
};
