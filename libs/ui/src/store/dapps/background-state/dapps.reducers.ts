import { createReducer } from '@reduxjs/toolkit';

import { DAppsState, dAppsInitialState } from '../dapps.state';

import { updateDAppInfoAction } from './dapps.actions';

export const backgroundDappsReducers = createReducer<DAppsState>(dAppsInitialState, builder =>
  builder.addCase(updateDAppInfoAction, (state, { payload: dAppInfo }) => ({
    ...state,
    [dAppInfo.origin]: { ...state[dAppInfo.origin], ...dAppInfo }
  }))
);
