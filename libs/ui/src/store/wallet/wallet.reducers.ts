import { createReducer } from '@reduxjs/toolkit';

import { mockHdAccount } from '../../mocks/account.interface.mock';

import { addAccountPublicKeyHash } from './wallet.actions';
import { appInfoInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(appInfoInitialState, builder => {
  builder.addCase(addAccountPublicKeyHash, state => ({
    ...state,
    selectedAccountPublicKeyHash: mockHdAccount.publicKeyHash
  }));
});
