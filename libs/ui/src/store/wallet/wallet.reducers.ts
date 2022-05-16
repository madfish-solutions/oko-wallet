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
  builder.addCase(generateHDAccountAction.success, (state, { payload: account }) => {
    const isExist = state.accountsByBlockchain.hasOwnProperty(state.selectedBlockchain);

    return {
      ...state,
      accountsByBlockchain: {
        ...state.accountsByBlockchain,
        [state.selectedBlockchain]:
          isExist === true ? [...state.accountsByBlockchain[state.selectedBlockchain], account] : [account]
      },
      selectedAccountPublicKeyHash: account.publicKeyHash
    };
  });
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

  builder.addCase(changeSelectedNetworkAction, (state, { payload: newSelectedNetwork }) => ({
    ...state,
    selectedNetworkRpcUrl: newSelectedNetwork.rpcUrl,
    selectedBlockchain: newSelectedNetwork.blockchain,
    selectedAccountPublicKeyHash: state.accountsByBlockchain.hasOwnProperty(newSelectedNetwork.blockchain)
      ? state.accountsByBlockchain[newSelectedNetwork.blockchain][0].publicKeyHash
      : ''
  }));
  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: [...state.networks, network],
    selectedNetworkRpcUrl: network.rpcUrl
  }));
});
