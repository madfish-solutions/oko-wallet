import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { getAccountTokensSlug } from '../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';

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

export const updateAccountsTokensState = (state: WalletState, account: AccountInterface) => {
  const accountTokens = getDefaultAccountTokens(state, account);
  const prepareAccountTokens = accountTokens && {
    [accountTokens.accountTokensSlug]: accountTokens.defaultAccountTokens
  };

  return { ...state.accountsTokens, ...prepareAccountTokens };
};
export const getDefaultAccountTokens = (state: WalletState, account: AccountInterface) => {
  const { selectedNetworkRpcUrl } = state;

  const accountTokensSlug = getAccountTokensSlug(
    selectedNetworkRpcUrl,
    getPublicKeyHash(account, getSelectedNetworkType(state))
  );
  const isChainIdExist = TOKENS_DEFAULT_LIST.hasOwnProperty(getCurrentNetworkChainId(selectedNetworkRpcUrl));

  if (isChainIdExist) {
    return {
      accountTokensSlug,
      defaultAccountTokens: TOKENS_DEFAULT_LIST[getCurrentNetworkChainId(selectedNetworkRpcUrl)].map(
        ({ tokenAddress, name, symbol }) => ({
          tokenAddress,
          name,
          symbol,
          isVisible: true,
          balance: '0'
        })
      )
    };
  }
};

export const getSelectedNetworkType = (state: WalletState): NetworkTypeEnum =>
  state.networks.find(network => network.rpcUrl === state.selectedNetworkRpcUrl)?.networkType ??
  NetworkTypeEnum.Ethereum;

export const getPublicKeyHash = (account: AccountInterface, networkType: NetworkTypeEnum): string =>
  checkIsNetworkTypeKeyExist(account, networkType) ? account.networksKeys[networkType].publicKeyHash : '';

export const getCurrentNetworkChainId = (rpcUrl: string) =>
  NETWORKS_DEFAULT_LIST.find(network => network.rpcUrl === rpcUrl)?.chainId ?? NETWORKS_DEFAULT_LIST[0].chainId;
