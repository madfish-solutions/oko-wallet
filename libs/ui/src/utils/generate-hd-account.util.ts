import { Observable, from, map, switchMap } from 'rxjs';

import { TEZOS_BIP44_COINTYPE } from '../constants/cointype';
import { AccountInterface } from '../interfaces/account.interface';
import { initialAccount } from '../mocks/account.interface.mock';
import { Shelter } from '../shelter/shelter';

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

  return Shelter.revealSeedPhrase$().pipe(
    switchMap(seedPhrase =>
      from(generateHdAccount(seedPhrase, derivationPath)).pipe(
        map(({ publicKey, address: publicKeyHash }) => ({
          ...initialAccount,
          name: `Account ${accountIndex + 1}`,
          accountIndex,
          networksKeys: {
            [networkType]: {
              publicKey,
              publicKeyHash
            }
          }
        }))
      )
    )
  );
};

export const generateHdAccountByNetworkTypeInSelectedAccount$ = (
  networkType: string,
  account: AccountInterface
): Observable<AccountInterface> => {
  const derivationPath = derivationPathByNetworkType[networkType](account.accountIndex);

  return Shelter.revealSeedPhrase$().pipe(
    switchMap(seedPhrase =>
      from(generateHdAccount(seedPhrase, derivationPath)).pipe(
        map(({ publicKey, address: publicKeyHash }) => ({
          ...account,
          networksKeys: {
            ...account.networksKeys,
            [networkType]: {
              publicKey,
              publicKeyHash
            }
          }
        }))
      )
    )
  );
};
