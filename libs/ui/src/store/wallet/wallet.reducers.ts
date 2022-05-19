import { createReducer } from '@reduxjs/toolkit';

import { getAccountTokensSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  changeSelectedNetworkAction,
  loadGasTokenBalanceAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction
} from './wallet.actions';
import { WalletState, walletInitialState } from './wallet.state';
import { updateSelectedNetworkState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
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
          { tokenAddress, isVisible: true, balance: '0' }
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
      const token = state.accountsTokens[accountTokensSlug].find(token => token.tokenAddress === tokenAddress);

      if (token !== undefined) {
        return {
          ...state,
          accountsTokens: {
            ...state.accountsTokens,
            [accountTokensSlug]: {
              ...state.accountsTokens[accountTokensSlug],
              isVisible: !token.isVisible
            }
          }
        };
      }

      return state;
    });
});
