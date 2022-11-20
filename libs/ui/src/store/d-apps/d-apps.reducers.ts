import { createReducer } from '@reduxjs/toolkit';

import { connectDAppAction, removeDAppConnectionAction } from './d-apps.actions';
import { dAppsInitialState, DAppsState } from './d-apps.state';

export const dAppsReducers = createReducer<DAppsState>(dAppsInitialState, builder =>
  builder
    .addCase(connectDAppAction, (state, { payload }) => {
      const dAppState = state[payload.dAppInfo.origin];

      return {
        ...state,
        [payload.dAppInfo.origin]: {
          ...dAppState,
          ...payload.dAppInfo,
          allowedAccounts: [...(dAppState?.allowedAccounts ?? []), payload.accountPublicKeyHash]
        }
      };
    })
    .addCase(removeDAppConnectionAction, (state, { payload }) => ({
      ...state,
      [payload.dAppInfo.origin]: {
        ...state[payload.dAppInfo.origin],
        allowedAccounts: state[payload.dAppInfo.origin].allowedAccounts.filter(
          account => account !== payload.accountPublicKeyHash
        )
      }
    }))
);
