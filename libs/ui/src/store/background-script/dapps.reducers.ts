import { createReducer } from '@reduxjs/toolkit';

import { updateDappInfo } from './dapps.actions';
import { DappState, DappsInitialState } from './dapps.state';

export const DappsReducers = createReducer<DappState>(DappsInitialState, builder => {
  builder.addCase(updateDappInfo, (state, { payload: { chainId, name, logoUrl, address } }) => ({
    ...state,
    [name]: { logoUrl, chainId, address }
  }));
});
