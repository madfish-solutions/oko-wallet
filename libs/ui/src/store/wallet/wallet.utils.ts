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
  const targetAccountTokens = accountsTokens[accountTokensSlug];

  if (typeof targetAccountTokens === 'undefined') {
    return state;
  }

  return {
    ...state,
    accountsTokens: {
      ...accountsTokens,
      [accountTokensSlug]: targetAccountTokens.map(accountToken =>
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
