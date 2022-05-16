import { createReducer } from '@reduxjs/toolkit';

import { createEntity } from '../utils/entity.utils';

import { addNewNetworkAction, changeSelectedNetworkAction, loadGasTokenBalanceAction, addTokenMetadataAction, changeTokenVisibilityAction } from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import { updateSelectedNetworkState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(loadGasTokenBalanceAction.submit, state =>
    updateSelectedNetworkState(state, selectedNetwork => ({
      gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, true)
    }))
  );
  builder.addCase(loadGasTokenBalanceAction.success, (state, { payload }) =>
    updateSelectedNetworkState(state, () => ({
      gasTokenBalance: createEntity(payload, false)
    }))
  );
  builder.addCase(loadGasTokenBalanceAction.fail, (state, { payload: error }) =>
    updateSelectedNetworkState(state, selectedNetwork => ({
      gasTokenBalance: createEntity(selectedNetwork.gasTokenBalance.data, false, error)
    }))
  );

  builder.addCase(changeSelectedNetworkAction, (state, { payload: networkRpcUrl }) => ({
    ...state,
    selectedNetworkRpcUrl: networkRpcUrl
  }));
  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }))    .addCase(addTokenMetadataAction, (state, { payload }) => {
    const currentAccount = state.selectedAccountPublicKeyHash;
    const currentNetwork = state.selectedNetwork;
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
        const currentToken = state.settings[state.selectedNetwork][currentAccount].find(
            token => token.tokenAddress === tokenAddress
        );

        if (currentToken) {
          currentToken.isVisible = isVisible;
        }
      });;
});
