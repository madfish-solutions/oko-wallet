import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { SendAssetPayload } from '../../interfaces/send-asset-action-payload.interface';
import { Token } from '../../interfaces/token.interface';
import { getAccountTokensSlug } from '../../utils/address.util';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';
import { getString } from '../../utils/get-string.utils';
import { getNetworkType } from '../../utils/network.util';
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

export const getCurrentNetworkChainId = (rpcUrl: string) =>
  NETWORKS_DEFAULT_LIST.find(network => network.rpcUrl === rpcUrl)?.chainId ?? NETWORKS_DEFAULT_LIST[0].chainId;

export const getTransferParams = (
  { receiverPublicKeyHash, amount }: SendAssetPayload,
  selectedNetwork: NetworkInterface
) => {
  if (getNetworkType(selectedNetwork) === NetworkTypeEnum.Tezos) {
    return [
      {
        to: receiverPublicKeyHash,
        amount: Number(amount)
      }
    ];
  }

  return {
    to: receiverPublicKeyHash,
    value: amount
  };
};
