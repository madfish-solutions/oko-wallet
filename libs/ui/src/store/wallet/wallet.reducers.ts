import { createReducer } from '@reduxjs/toolkit';

import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  addHdAccountAction,
  setSelectedAccountAction,
  changeSelectedNetworkAction,
  loadGasTokenBalanceAction,
  loadAccountTokenBalanceAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction
} from './wallet.actions';
import { WalletState, walletInitialState } from './wallet.state';
import { updateSelectedNetworkState, updateAccountTokenState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder
    .addCase(addHdAccountAction, (state, { payload: account }) => ({
      ...state,
      accounts: [...state.accounts, account]
    }))
    .addCase(setSelectedAccountAction, (state, { payload: selectedAccount }) => ({
      ...state,
      selectedAccountPublicKeyHash: selectedAccount ?? ''
    }))
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
    )
    .addCase(loadAccountTokenBalanceAction.submit, (state, { payload: { token } }) =>
      updateAccountTokenState(state, token.tokenAddress, accountToken => ({
        balance: createEntity(accountToken.balance.data, true)
      }))
    )
    .addCase(loadAccountTokenBalanceAction.success, (state, { payload: { token, balance } }) =>
      updateAccountTokenState(state, token.tokenAddress, () => ({
        balance: createEntity(balance, false)
      }))
    )
    .addCase(loadAccountTokenBalanceAction.fail, (state, { payload: { token, error } }) =>
      updateAccountTokenState(state, token.tokenAddress, accountToken => ({
        balance: createEntity(accountToken.balance.data, false, error)
      }))
    )
    .addCase(changeSelectedNetworkAction, (state, { payload: networkRpcUrl }) => ({
      ...state,
      selectedNetworkRpcUrl: networkRpcUrl
    }))
    .addCase(addNewNetworkAction, (state, { payload: network }) => ({
      ...state,
      networks: [...state.networks, network],
      selectedNetworkRpcUrl: network.rpcUrl
    }))
    .addCase(addTokenMetadataAction, (state, { payload: tokenMetadata }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const { tokenAddress } = tokenMetadata;

      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
      const accountTokensSlug = getAccountTokensSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      const accountsTokens = {
        ...state.accountsTokens,
        [accountTokensSlug]: [...(state.accountsTokens[accountTokensSlug] ?? [])]
      };
      const existingTokenIndex = state.accountsTokens[accountTokensSlug]?.findIndex(
        ({ tokenAddress: existingTokenAddress }) => existingTokenAddress === tokenAddress
      );

      if (existingTokenIndex > -1) {
        accountsTokens[accountTokensSlug][existingTokenIndex] = {
          ...accountsTokens[accountTokensSlug][existingTokenIndex],
          isVisible: true
        };
      } else {
        accountsTokens[accountTokensSlug] = [
          ...accountsTokens[accountTokensSlug],
          { tokenAddress, isVisible: true, balance: createEntity('0', false) }
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
    .addCase(changeTokenVisibilityAction, (state, { payload: tokenAddress }) => {
      const accountTokensSlug = getAccountTokensSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const updatedAccountTokens = state.accountsTokens[accountTokensSlug].map(accountToken =>
        accountToken.tokenAddress === tokenAddress
          ? { ...accountToken, isVisible: !accountToken.isVisible }
          : accountToken
      );

      return { ...state, accountsTokens: { ...state.accountsTokens, [accountTokensSlug]: updatedAccountTokens } };
    });
});
