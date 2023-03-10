import { isDefined } from '@rnw-community/shared';
import { AccountInterface, NetworkTypeEnum } from 'shared';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { AccountToken } from '../../interfaces/account-token.interface';
import { Token } from '../../interfaces/token.interface';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';
import { getString } from '../../utils/get-string.utils';
import { getTokenSlug } from '../../utils/token.utils';
import { createEntity } from '../utils/entity.utils';

import { initialVisibleTokens } from './constants/initial-visible-tokens';
import { WalletState } from './wallet.state';

export const updateAccountsGasTokensState = (
  state: WalletState,
  { balance, isLoading = false, error }: { balance?: string; isLoading?: boolean; error?: string }
): WalletState => {
  const { selectedAccountPublicKeyHash, accountsGasTokens } = state;

  const chainId = getSelectedNetworkChainId(state);

  const accountGasTokenSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);
  const gasTokenBalance = isDefined(balance) ? balance : accountsGasTokens[accountGasTokenSlug]?.data;

  return {
    ...state,
    accountsGasTokens: {
      ...accountsGasTokens,
      [accountGasTokenSlug]: createEntity(gasTokenBalance, isLoading, error)
    }
  };
};

export const updateAccountsTokensState = (state: WalletState, account: AccountInterface) => {
  const accountTokens = getDefaultAccountTokens(state, account);
  const prepareAccountTokens = accountTokens && {
    [accountTokens.accountTokensSlug]: accountTokens.defaultAccountTokens
  };

  return { ...state.accountsTokens, ...prepareAccountTokens };
};

const getDefaultAccountTokens = (state: WalletState, account: AccountInterface) => {
  const { networks, selectedNetworkRpcUrl } = state;
  const chainId = getSelectedNetworkChainId(state);
  const accountTokensSlug = getAccountTokensSlug(chainId, getPublicKeyHash(account, getSelectedNetworkType(state)));

  const currentNetwork = networks.find(network => network.rpcUrl === selectedNetworkRpcUrl);

  if (currentNetwork && currentNetwork.chainId && TOKENS_DEFAULT_LIST.hasOwnProperty(currentNetwork.chainId)) {
    return {
      accountTokensSlug,
      defaultAccountTokens: TOKENS_DEFAULT_LIST[currentNetwork.chainId].map(({ tokenAddress, tokenId }, index) => ({
        tokenAddress,
        tokenId,
        isVisible: index < initialVisibleTokens,
        balance: createEntity('0')
      }))
    };
  }
};

export const updateAccountTokenState = (
  state: WalletState,
  token: Token,
  updateFunc: (token: AccountToken) => Partial<AccountToken>
): WalletState => {
  const { selectedAccountPublicKeyHash, accountsTokens } = state;
  const chainId = getSelectedNetworkChainId(state);
  const accountTokensSlug = getAccountTokensSlug(chainId, selectedAccountPublicKeyHash);
  const tokenSlug = getTokenSlug(token.tokenAddress, token.tokenId);
  const targetAccountTokens = accountsTokens[accountTokensSlug];

  if (typeof targetAccountTokens === 'undefined') {
    return state;
  }

  return {
    ...state,
    accountsTokens: {
      ...accountsTokens,
      [accountTokensSlug]: targetAccountTokens.map(accountToken =>
        getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) === tokenSlug
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

export const getSelectedNetworkChainId = (state: WalletState): string =>
  state.networks.find(network => network.rpcUrl === state.selectedNetworkRpcUrl)?.chainId ??
  NETWORKS_DEFAULT_LIST[0].chainId;

export const getPublicKeyHash = (account: AccountInterface, networkType: NetworkTypeEnum): string =>
  checkIsNetworkTypeKeyExist(account, networkType) ? getString(account.networksKeys[networkType]?.publicKeyHash) : '';

export const getSelectedAccount = (state: WalletState, networkType: NetworkTypeEnum) =>
  state.accounts.find(account =>
    account.networksKeys.hasOwnProperty(networkType)
      ? account.networksKeys[networkType]?.publicKeyHash === state.selectedAccountPublicKeyHash
      : null
  ) ?? initialAccount;
