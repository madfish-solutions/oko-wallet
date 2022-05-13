import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { initialAccount } from '../../mocks/account.interface.mock';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedAccountSelector = () => {
  const wallet = useSelector<WalletRootState, WalletState>(({ wallet }) => wallet);

  return useMemo(
    () =>
      wallet.accounts.find(account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash) ?? initialAccount,
    [wallet.selectedAccountPublicKeyHash]
  );
};

export const useSelectedNetworkSelector = () => {
  const wallet = useSelector<WalletRootState, WalletState>(({ wallet }) => wallet);

  return useMemo(
    () => wallet.networks.find(network => network.rpcUrl === wallet.selectedNetworkRpcUrl) ?? NETWORKS_DEFAULT_LIST[0],
    [wallet.selectedNetworkRpcUrl, wallet.networks]
  );
};

export const useAllNetworksSelector = () =>
  useSelector<WalletRootState, WalletState['networks']>(({ wallet }) => wallet.networks);
