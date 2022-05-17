import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { initialAccount } from '../../mocks/account.interface.mock';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedNetworkSelector = () =>
  useSelector<WalletRootState, NetworkInterface>(
    ({ wallet }) =>
      wallet.networks.find(network => network.rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0],
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useAllNetworksSelector = () =>
  useSelector<WalletRootState, WalletState['networks']>(({ wallet }) => wallet.networks);

// NEW: Accounts by blockchain
export const useAccountsByBlockchainSelector = () =>
  useSelector<WalletRootState, AccountInterface[]>(({ wallet }) =>
    wallet.accountsByBlockchain.hasOwnProperty(wallet.selectedNetworkType)
      ? wallet.accountsByBlockchain[wallet.selectedNetworkType]
      : []
  );

export const useSelectedAccountByBlockchainSelectorPure = () =>
  useSelector<WalletRootState, AccountInterface>(
    ({ wallet }) => {
      const isExist = wallet.accountsByBlockchain.hasOwnProperty(wallet.selectedNetworkType);

      return isExist
        ? wallet.accountsByBlockchain[wallet.selectedNetworkType].find(
            account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash
          ) ?? initialAccount
        : initialAccount;
    },
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useSelectedAccountByBlockchainSelector = () => {
  const accounts = useAccountsByBlockchainSelector();
  const selectedAccount = useSelectedAccountByBlockchainSelectorPure();

  return accounts.length ? selectedAccount : initialAccount;
};

export const useAllAccountsSelector = () =>
  useSelector<WalletRootState, WalletState['accountsByBlockchain']>(({ wallet }) => wallet.accountsByBlockchain);

// Test
export const useAccountIsExist = () =>
  useSelector<WalletRootState, boolean>(({ wallet }) =>
    wallet.accountsByBlockchain.hasOwnProperty(wallet.selectedNetworkType)
  );
