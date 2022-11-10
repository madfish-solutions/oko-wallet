import { createReducer } from '@reduxjs/toolkit';

import { updateDappInfo } from '../dapps.actions';
import { DappState, DappsInitialState } from '../dapps.state';

export const backgroundDappsReducers = createReducer<DappState>(DappsInitialState, builder =>
  builder.addCase(updateDappInfo, (state, { payload }) => ({
    ...state,
    [payload.name]: { ...state[payload.name], ...payload }
  }))
);
