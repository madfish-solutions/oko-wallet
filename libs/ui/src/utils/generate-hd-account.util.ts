import { TEZOS_BIP44_COINTYPE } from '../constants/cointype';

import { getEtherDerivationPath, getTezosDerivationPath } from './derivation-path.utils';
import { generateEvmHdAccount } from './generate-ethereum-hd-account.util';
import { generateTezosHdAccount } from './generate-tezos-hd-account.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, , cointype] = derivationPath.split('/');
  switch (cointype.replace("'", '')) {
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return generateEvmHdAccount(seedPhrase, derivationPath);
  }
};

export const derivationPathByNetworkType: Record<string, (accountIndex: number) => string> = {
  Ethereum: (accountIndex: number) => getEtherDerivationPath(accountIndex),
  Tezos: (accountIndex: number) => getTezosDerivationPath(accountIndex)
};
