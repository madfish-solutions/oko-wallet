import { getCurrentNetworkChainId } from '../../constants/networks';
import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { getAccountTokensSlug } from '../../utils/address.util';

import { WalletState } from './wallet.state';

export const updateSelectedNetworkState = (
  state: WalletState,
  updateFunc: (selectedNetwork: NetworkInterface) => Partial<NetworkInterface>
): WalletState => ({
  ...state,
  networks: state.networks.map(network =>
    network.rpcUrl === state.selectedNetworkRpcUrl
      ? {
          ...network,
          ...updateFunc(network)
        }
      : network
  )
});

export const getDefaultAccountTokens = (state: WalletState, account: AccountInterface) => {
  const { selectedNetworkRpcUrl } = state;
  const accountTokensSlug = getAccountTokensSlug(
    selectedNetworkRpcUrl,
    account.networksKeys[state.selectedNetworkType].publicKeyHash
  );

  return {
    accountTokensSlug,
    defaultAccountTokens: TOKENS_DEFAULT_LIST[getCurrentNetworkChainId(selectedNetworkRpcUrl)].map(
      ({ tokenAddress }) => ({
        tokenAddress,
        isVisible: true,
        balance: '0'
      })
    )
  };
};
