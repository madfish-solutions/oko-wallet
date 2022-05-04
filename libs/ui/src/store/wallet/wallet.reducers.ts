import { createReducer } from '@reduxjs/toolkit';

import { mockHdAccount } from '../../mocks/account.interface.mock';
import { createEntity } from '../utils/entity.utils';

import { generateHDAccount, getGasTokenBalanceAction } from './wallet.actions';
import { appInfoInitialState, WalletState } from './wallet.state';

export const walletReducers = createReducer<WalletState>(appInfoInitialState, builder => {
  builder.addCase(generateHDAccount, state => ({
    ...state,
    accounts: [mockHdAccount],
    selectedAccountPublicKeyHash: mockHdAccount.publicKeyHash
  }));

  builder.addCase(getGasTokenBalanceAction.submit, state => ({
    ...state,
    gasTokenBalance: createEntity(state.gasTokenBalance.data, true)
  }));
  builder.addCase(getGasTokenBalanceAction.success, (state, { payload }) => ({
    ...state,
    gasToken: payload.gasToken,
    gasTokenBalance: createEntity(payload.gasTokenBalance, false)
  }));
});
