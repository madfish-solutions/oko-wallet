import { createReducer } from '@reduxjs/toolkit';

import { DAppsState, dAppsInitialState, emptyDAppState } from '../dapps.state';

import { updateDAppInfoAction } from './dapps.actions';

export const backgroundDappsReducers = createReducer<DAppsState>(dAppsInitialState, builder =>
  builder.addCase(updateDAppInfoAction, (state, { payload: dAppInfo }) => ({
    ...state,
    [dAppInfo.origin]: {
      ...emptyDAppState,
      ...state[dAppInfo.origin],
      ...dAppInfo
    }
  }))
);
