import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';
import { getString } from '../../utils/get-string.utils';
import { getTokenSlug } from '../../utils/token.utils';
import { createEntity } from '../utils/entity.utils';

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
  const { networks, selectedNetworkRpcUrl } = state;

  const accountTokensSlug = getAccountTokensSlug(
    selectedNetworkRpcUrl,
    getPublicKeyHash(account, getSelectedNetworkType(state))
  );

  const currentNetwork = networks.find(network => network.rpcUrl === selectedNetworkRpcUrl);

  if (currentNetwork && currentNetwork.chainId && TOKENS_DEFAULT_LIST.hasOwnProperty(currentNetwork.chainId)) {
    return {
      accountTokensSlug,
      defaultAccountTokens: TOKENS_DEFAULT_LIST[currentNetwork.chainId].map(
        ({ tokenAddress, name, symbol }, index) => ({
          tokenAddress,
          name,
          symbol,
          isVisible: index < 4,
          balance: createEntity('0')
        })
      )
    };
  }
};

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

export const getSelectedNetworkType = (state: WalletState): NetworkTypeEnum =>
  state.networks.find(network => network.rpcUrl === state.selectedNetworkRpcUrl)?.networkType ?? NetworkTypeEnum.EVM;

export const getPublicKeyHash = (account: AccountInterface, networkType: NetworkTypeEnum): string =>
  checkIsNetworkTypeKeyExist(account, networkType) ? getString(account.networksKeys[networkType]?.publicKeyHash) : '';

export const getSelectedAccount = (state: WalletState, networkType: NetworkTypeEnum) =>
  state.accounts.find(account =>
    account.networksKeys.hasOwnProperty(networkType)
      ? account.networksKeys[networkType]?.publicKeyHash === state.selectedAccountPublicKeyHash
      : null
  ) ?? initialAccount;
