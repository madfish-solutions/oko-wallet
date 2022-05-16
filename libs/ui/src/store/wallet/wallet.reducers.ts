import { createReducer } from '@reduxjs/toolkit';

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
    .addCase(addTokenMetadataAction, (state, { payload }) => {
      const currentAccount = state.selectedAccountPublicKeyHash;
      const currentNetwork = state.selectedNetworkRpcUrl;
      const tokenAddress = payload.tokenAddress;

      state.tokensMetadata = {
        ...state.tokensMetadata,
        [currentNetwork]: {
          ...state.tokensMetadata[currentNetwork],
          [payload.tokenAddress]: payload
        }
      };

      state.settings = {
        ...state.settings,
        [currentNetwork]: {
          ...state.settings[currentNetwork],
          [currentAccount]: [
            ...(state.settings[currentNetwork]?.[currentAccount] ?? []),
            { tokenAddress, isVisible: true }
          ]
        }
      };
    })
    .addCase(changeTokenVisibilityAction, (state, { payload: { tokenAddress, isVisible } }) => {
      const currentAccount = state.selectedAccountPublicKeyHash;
      const currentToken = state.settings[state.selectedNetworkRpcUrl][currentAccount].find(
        token => token.tokenAddress === tokenAddress
      );

      if (currentToken) {
        currentToken.isVisible = isVisible;
      }
    });
});
