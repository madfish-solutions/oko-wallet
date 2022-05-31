import { AccountToken } from '../../interfaces/account-token.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenSlug } from '../../utils/token.utils';

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

export const updateAccountTokenState = (
  state: WalletState,
  token: Token,
  updateFunc: (token: AccountToken) => Partial<AccountToken>
): WalletState => {
  const { selectedNetworkRpcUrl, selectedAccountPublicKeyHash, accountsTokens } = state;
  const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);
  const tokenSlug = getTokenSlug(token);

  return {
    ...state,
    accountsTokens: {
      ...accountsTokens,
      [accountTokensSlug]: accountsTokens[accountTokensSlug].map(accountToken =>
        getTokenSlug(accountToken) === tokenSlug
          ? {
              ...accountToken,
              ...updateFunc(accountToken)
            }
          : accountToken
      )
    }
  };
};
