import { createReducer } from '@reduxjs/toolkit';

import { createEntity } from '../utils/entity.utils';

import { getGasTokenBalanceAction } from './wallet.actions';
import { walletInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(getGasTokenBalanceAction.submit, state => ({
    ...state,
    gasTokenBalance: createEntity(state.gasTokenBalance.data, true)
  }));
  builder.addCase(getGasTokenBalanceAction.success, (state, { payload }) => ({
    ...state,
    gasToken: payload.gasToken,
    gasTokenBalance: createEntity(payload.gasTokenBalance, false)
  }));
  builder.addCase(getGasTokenBalanceAction.fail, (state, { payload: error }) => ({
    ...state,
    gasTokenBalance: createEntity(state.gasTokenBalance.data, false, error)
  }));
});
