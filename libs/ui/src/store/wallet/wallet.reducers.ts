import { createReducer } from '@reduxjs/toolkit';

import { createEntity } from '../utils/entity.utils';

import {
  addNewNetworkAction,
  changeSelectedNetworkAction,
  generateHDAccountAction,
  loadGasTokenBalanceAction,
  switchAccountAction
} from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';
import { updateSelectedNetworkState } from './wallet.utils';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(generateHDAccountAction.success, (state, { payload: account }) => ({
    ...state,
    accounts: [...state.accounts, account],
    selectedAccountPublicKeyHash: account.publicKeyHash
  }));
  builder.addCase(switchAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: account.publicKeyHash
  }));

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
  }));
});
