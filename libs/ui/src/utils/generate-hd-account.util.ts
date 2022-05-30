import { Observable, from, map } from 'rxjs';

import { TEZOS_BIP44_COINTYPE } from '../constants/cointype';
import { AccountInterface } from '../interfaces/account.interface';
import { initialAccount } from '../mocks/account.interface.mock';
import { MOCK_HD_ACCOUNT } from '../mocks/hd-account.mock';

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

const derivationPathByNetworkType: Record<string, (accountIndex: number) => string> = {
  Ethereum: (accountIndex: number) => getEtherDerivationPath(accountIndex),
  Tezos: (accountIndex: number) => getTezosDerivationPath(accountIndex)
};

export const generateHdAccountByNetworkType$ = (
  networkType: string,
  accountIndex: number
): Observable<AccountInterface> => {
  const derivationPath = derivationPathByNetworkType[networkType](accountIndex);

  // TODO: get seed phrase from Shelter
  return from(generateHdAccount(MOCK_HD_ACCOUNT.seed, derivationPath)).pipe(
    map(hdAccount => ({
      ...initialAccount,
      name: `Account ${accountIndex + 1}`,
      accountIndex,
      networksKeys: {
        [networkType]: {
          publicKey: '',
          publicKeyHash: hdAccount.address
        }
      }
    }))
  );
};

export const generateNewHdAccountByNewNetworkTypeInSelectedAccount$ = (
  networkType: string,
  account: AccountInterface
): Observable<AccountInterface> => {
  const derivationPath = derivationPathByNetworkType[networkType](account.accountIndex);

  // TODO: get seed phrase from Shelter
  return from(generateHdAccount(MOCK_HD_ACCOUNT.seed, derivationPath)).pipe(
    map(hdAccount => ({
      ...account,
      networksKeys: {
        ...account.networksKeys,
        [networkType]: {
          publicKey: 'publicKey',
          publicKeyHash: hdAccount.address
        }
      }
    }))
  );
};
