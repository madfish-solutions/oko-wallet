import { createReducer } from '@reduxjs/toolkit';

import { getAccountAddressSlug } from '../../utils/address.util';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { createEntity } from '../utils/entity.utils';

import { WalletState } from './types';
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
    .addCase(addTokenMetadataAction, (state, { payload: token }) => {
      const { selectedAccountPublicKeyHash, selectedNetworkRpcUrl } = state;
      const tokenAddress = token.address;

      const tokenMetadataSlug = getTokenMetadataSlug(selectedNetworkRpcUrl, tokenAddress);
      const accountAddressSlug = getAccountAddressSlug(selectedNetworkRpcUrl, selectedAccountPublicKeyHash);

      state.tokensMetadata[tokenMetadataSlug] = token;
      state.settings[accountAddressSlug] = [
        ...(state.settings[accountAddressSlug] ?? []),
        { tokenAddress, isVisible: true, balance: '0' }
      ];
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: tokenAddress }) => {
      const accountAddressSlug = getAccountAddressSlug(state.selectedNetworkRpcUrl, state.selectedAccountPublicKeyHash);
      const token = state.settings[accountAddressSlug].find(token => token.tokenAddress === tokenAddress);

      if (token) {
        token.isVisible = !token.isVisible;
      }
    });
});
