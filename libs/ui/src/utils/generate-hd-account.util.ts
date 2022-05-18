import { Observable, from, map } from 'rxjs';

import { TEZOS_BIP44_COINTYPE, ETHER_BIP44_COINTYPE } from '../constants/cointype';
import { AccountInterface } from '../interfaces/account.interface';
import { initialAccount } from '../mocks/account.interface.mock';
import { MOCK_HD_ACCOUNT } from '../mocks/hd-account.mock';

import { getEtherDerivationPath, getTezosDerivationPath } from './derivation-path.utils';
import { generateEthereumHdAccount } from './generate-klaytn-hd-account.util';
import { generateTezosHdAccount } from './generate-tezos-hd-account.util';

export const generateHdAccount = async (seedPhrase: string, derivationPath: string) => {
  const [, , cointype] = derivationPath.split('/');

  switch (cointype.replace("'", '')) {
    case ETHER_BIP44_COINTYPE:
      return generateEthereumHdAccount(seedPhrase, derivationPath);
    case TEZOS_BIP44_COINTYPE:
      return generateTezosHdAccount(seedPhrase, derivationPath);
    default:
      return generateEthereumHdAccount(seedPhrase, derivationPath);
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
      networks: {
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
      networks: {
        ...account.networks,
        [networkType]: {
          publicKey: 'publicKey',
          publicKeyHash: hdAccount.address
        }
      }
    }))
  );
};
