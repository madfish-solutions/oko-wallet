import { createReducer } from '@reduxjs/toolkit';

import { createEntity } from '../utils/entity.utils';

import { WalletState } from './types';
import { getAccountTokenSlug } from './utils/get-account-token-slug';
import { getMetadataSlug } from './utils/get-metadata-slug';
import {
  addNewNetworkAction,
  changeSelectedNetworkAction,
  loadGasTokenBalanceAction,
  addTokenMetadataAction,
  changeTokenVisibilityAction
} from './wallet.actions';
import { walletInitialState } from './wallet.state';
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
    .addCase(addTokenMetadataAction, (state, { payload }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const tokenAddress = payload.address;

      const metadataSlug = getMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
      const accountTokenSlug = getAccountTokenSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      state.tokensMetadata[metadataSlug] = payload;
      state.settings[accountTokenSlug] = [
        ...(state.settings[accountTokenSlug] ?? []),
        { tokenAddress, isVisible: true }
      ];
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: { tokenAddress, isVisible } }) => {
      const accountTokenSlug = getAccountTokenSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const token = state.settings[accountTokenSlug].find(token => token.tokenAddress === tokenAddress);

      if (token) {
        token.isVisible = isVisible;
      }
    });
});
