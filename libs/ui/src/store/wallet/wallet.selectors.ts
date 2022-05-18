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

// NEW: Accounts
export const useSelectedAccountSelector = () =>
  useSelector<WalletRootState, AccountInterface>(
    ({ wallet }) => {
      const selectedAccount = wallet.accounts.find(account => account.accountIndex === wallet.selectedAccountIndex);

      return selectedAccount ?? initialAccount;
    },
    (left, right) => JSON.stringify(left) === JSON.stringify(right)
  );

export const useSelectedAccountPkhSelector = () =>
  useSelector<WalletRootState, string>(({ wallet }) => wallet.selectedAccountPublicKeyHash);

export const useSelectedNetworkTypeSelector = () =>
  useSelector<WalletRootState, WalletState['selectedNetworkType']>(({ wallet }) => wallet.selectedNetworkType);

export const useAllAccountsSelector = () =>
  useSelector<WalletRootState, WalletState['accounts']>(({ wallet }) => wallet.accounts);
