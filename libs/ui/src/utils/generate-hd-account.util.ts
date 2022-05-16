import { Observable, from, map } from 'rxjs';

import { TEZOS_BIP44_COINTYPE, ETHER_BIP44_COINTYPE } from '../constants/cointype';
import { AccountInterface } from '../interfaces/account.interface';
import { mockHdAccount } from '../mocks/account.interface.mock';
import { MOCK_HD_ACCOUNT } from '../mocks/hd-account.mock';

import { getEtherDerivationPath, getTezosDerivationPath } from './derivation-path.utils';
import { generateKlaytnHdAccount } from './generate-klaytn-hd-account.util';
import { generateTezosHdAccount } from './generate-tezos-hd-account.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, , cointype] = derivationPath.split('/');

  switch (cointype.replace("'", '')) {
    case ETHER_BIP44_COINTYPE:
      return generateKlaytnHdAccount(seedPhrase, derivationPath);
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return {};
  }
};

const derivationPathByBlockchain: Record<string, (accountIndex: number) => string> = {
  Ethereum: (accountIndex: number) => getEtherDerivationPath(accountIndex),
  Tezos: (accountIndex: number) => getTezosDerivationPath(accountIndex)
};

export const generateHdAccountByBlockchain$ = (
  blockchain: string,
  accountIndex: number
): Observable<AccountInterface> => {
  const derivationPath = derivationPathByBlockchain[blockchain](accountIndex);

  // TODO: get seed phrase from Shelter
  return from(generateHdAccount(MOCK_HD_ACCOUNT.seed, derivationPath)).pipe(
    map((hdAccount: any) => ({
      ...mockHdAccount,
      name: `Account ${accountIndex + 1}`,
      publicKeyHash: hdAccount.address,
      accountIndex
    }))
  );
};
