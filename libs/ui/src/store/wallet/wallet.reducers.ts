import { createReducer } from '@reduxjs/toolkit';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { initialAccount } from '../../mocks/account.interface.mock';
import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  createHdAccountForNewNetworkTypeAction,
  changeNetworkAction,
  createHdAccountAction,
  setSelectedAccountAction,
  loadGasTokenBalanceAction,
  changeAccountAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction,
  loadAccountTokenBalanceAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import {
  getPublicKeyHash,
  getSelectedNetworkType,
  updateAccountsTokensState,
  updateAccountTokenState,
  updateSelectedNetworkState
} from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(createHdAccountAction, (state, { payload: newAccount }) => ({
      ...state,
      accounts: [...state.accounts, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
      selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state)),
      accountsTokens: updateAccountsTokensState(state, newAccount)
    }))
    .addCase(createHdAccountForNewNetworkTypeAction, (state, { payload: newAccount }) => {
      const accountsWithoutCurrent = state.accounts.filter(account => account.accountIndex !== newAccount.accountIndex);

      return {
        ...state,
        accounts: [...accountsWithoutCurrent, newAccount].sort((a, b) => a.accountIndex - b.accountIndex),
        selectedAccountPublicKeyHash: getPublicKeyHash(newAccount, getSelectedNetworkType(state)),
        accountsTokens: updateAccountsTokensState(state, newAccount)
      };
    })
    .addCase(setSelectedAccountAction, (state, { payload: selectedAccountPublicKeyHash }) => ({
      ...state,
      selectedAccountPublicKeyHash
    }));
  builder
    .addCase(loadGasTokenBalanceAction.submit, state =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, true)
      }))
    )
    .addCase(loadGasTokenBalanceAction.success, (state, { payload }) =>
      updateSelectedNetworkState(state, () => ({
        gasTokenBalance: createEntity(payload, false)
      }))
    )
    .addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
      updateSelectedNetworkState(state, selectedNetwork => ({
        gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, false, error)
      }))
    );
  builder
    .addCase(loadAccountTokenBalanceAction.submit, (state, { payload: { token } }) =>
      updateAccountTokenState(state, token, accountToken => ({
        balance: createEntity(accountToken.balance.data, true)
      }))
    )
    .addCase(loadAccountTokenBalanceAction.success, (state, { payload: { token } }) =>
      updateAccountTokenState(state, token, () => token)
    )
    .addCase(loadAccountTokenBalanceAction.fail, (state, { payload: { token, error } }) =>
      updateAccountTokenState(state, token, accountToken => ({
        balance: createEntity(accountToken.balance.data, false, error)
      }))
    )
    .addCase(addTokenMetadataAction, (state, { payload: tokenInput }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress, tokenId, ...tokenMetadata } = tokenInput;
      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress, tokenId);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const accountsTokens = {
        ...state.accountsTokens,
        [accountTokensSlug]: [...(state.accountsTokens[accountTokensSlug] ?? [])]
      };
      const existingTokenIndex = state.accountsTokens[accountTokensSlug]?.findIndex(
        ({ tokenId: existingTokenId, tokenAddress: existingTokenAddress }) =>
          tokenId === existingTokenId && tokenAddress === existingTokenAddress
      );

      if (existingTokenIndex > -1) {
        accountsTokens[accountTokensSlug][existingTokenIndex] = {
          ...accountsTokens[accountTokensSlug][existingTokenIndex],
          isVisible: true
        };
      } else {
        accountsTokens[accountTokensSlug] = [
          ...accountsTokens[accountTokensSlug],
          {
            tokenId,
            tokenAddress,
            isVisible: true,
            balance: createEntity('0')
          }
        ];
      }

      return {
        ...state,
        accountsTokens,
        tokensMetadata: {
          ...state.tokensMetadata,
          [tokenMetadataSlug]: tokenMetadata
        }
      };
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: token }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        accountToken.tokenAddress === token.tokenAddress
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    });

  builder.addCase(changeAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: getPublicKeyHash(account, getSelectedNetworkType(state))
  }));

  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }));
  builder.addCase(changeNetworkAction, (state, { payload: selectedNetworkRpcUrl }) => {
    const prevNetworkType = getSelectedNetworkType(state);
    const newNetworkType =
      state.networks.find(network => network.rpcUrl === selectedNetworkRpcUrl)?.networkType ?? NetworkTypeEnum.EVM;

    const selectedAccount =
      state.accounts.find(account =>
        account.networksKeys.hasOwnProperty(prevNetworkType)
          ? account.networksKeys[prevNetworkType]?.publicKeyHash === state.selectedAccountPublicKeyHash
          : null
      ) ?? initialAccount;

    return {
      ...state,
      selectedNetworkRpcUrl,
      selectedAccountPublicKeyHash: getPublicKeyHash(selectedAccount, newNetworkType),
      accountsTokens: updateAccountsTokensState({ ...state, selectedNetworkRpcUrl }, selectedAccount)
    };
  });
});
