import { createReducer } from '@reduxjs/toolkit';

import { mockHdAccount } from '../../mocks/account.interface.mock';

import { generateHDAccount, addHdAccountAction, setSelectedAccountAction } from './wallet.actions';
import { appInfoInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(appInfoInitialState, builder => {
  builder
    .addCase(generateHDAccount, state => ({
      ...state,
      accounts: [mockHdAccount],
      selectedAccountPublicKeyHash: mockHdAccount.publicKeyHash
    }))
    .addCase(addHdAccountAction, (state, { payload: account }) => ({
      ...state,
      accounts: [...state.accounts, account]
    }))
    .addCase(setSelectedAccountAction, (state, payload) => ({
      ...state,
      selectedAccountPublicKeyHash: payload.payload ?? ''
    }));
});
