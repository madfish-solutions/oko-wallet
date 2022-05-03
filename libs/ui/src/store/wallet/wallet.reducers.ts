import { createReducer } from '@reduxjs/toolkit';

import { mockHdAccount } from '../../mocks/account.interface.mock';

import { generateHDAccount } from './wallet.actions';
import { appInfoInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(appInfoInitialState, builder => {
  builder.addCase(generateHDAccount, state => ({
    ...state,
    accounts: [mockHdAccount],
    selectedAccountPublicKeyHash: mockHdAccount.publicKeyHash
  }));
});
