import { createReducer } from '@reduxjs/toolkit';

import { deleteDapp, updateDappInfo } from './dapps.actions';
import { DappState, DappsInitialState } from './dapps.state';

export const DappsReducers = createReducer<DappState>(DappsInitialState, builder =>
  builder
    .addCase(updateDappInfo, (state, { payload }) => ({
      ...state,
      [payload.name]: { ...state[payload.name], ...payload }
    }))
    .addCase(deleteDapp, (state, { payload: dappName }) => {
      const newAllDapps = { ...state };
      delete newAllDapps[dappName];

      return {
        ...newAllDapps
      };
    })
);
