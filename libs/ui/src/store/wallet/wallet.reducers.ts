import { createReducer } from '@reduxjs/toolkit';

import { generateHDAccountAction, switchAccountAction } from './wallet.actions';
import { appInfoInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(appInfoInitialState, builder => {
  builder.addCase(generateHDAccountAction.success, (state, { payload: account }) => ({
    ...state,
    accounts: [...state.accounts, account],
    selectedAccountPublicKeyHash: account.publicKeyHash
  }));
  builder.addCase(switchAccountAction, (state, { payload: account }) => ({
    ...state,
    selectedAccountPublicKeyHash: account.publicKeyHash
  }));
});
