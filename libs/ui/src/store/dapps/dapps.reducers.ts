import { createReducer } from '@reduxjs/toolkit';

import { connectDAppAction, removeDAppConnectionAction } from './dapps.actions';
import { dAppsInitialState, DAppsState } from './dapps.state';

export const dAppsReducers = createReducer<DAppsState>(dAppsInitialState, builder =>
  builder
    .addCase(connectDAppAction, (state, { payload }) => ({
      ...state,
      [payload.dAppOrigin]: {
        ...state[payload.dAppOrigin],
        allowedAccounts: [...state[payload.dAppOrigin]?.allowedAccounts, payload.accountPublicKeyHash]
      }
    }))
    .addCase(removeDAppConnectionAction, (state, { payload }) => ({
      ...state,
      [payload.dAppOrigin]: {
        ...state[payload.dAppOrigin],
        allowedAccounts: state[payload.dAppOrigin].allowedAccounts.filter(
          account => account !== payload.accountPublicKeyHash
        )
      }
    }))
);
