import { NetworkInterface } from '../../interfaces/network.interface';
import { AccountToken } from '../../interfaces/account-token.interface';
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

export const updateAccountTokenState = (
    state: WalletState,
    tokenAddress: string,
    updateFunc: (token: AccountToken) => Partial<AccountToken>
): WalletState => {
    const { selectedNetworkRpcUrl, selectedAccountPublicKeyHash, accountsTokens} = state;
    const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

    return {
        ...state,
        accountsTokens: {
            ...accountsTokens,
            [accountTokensSlug]: accountsTokens[accountTokensSlug].map(accountToken =>
                accountToken.tokenAddress ===  tokenAddress
                    ? {
                        ...accountToken,
                        ...updateFunc(accountToken)
                    }
                    : accountToken
            )
        }
    }
};
