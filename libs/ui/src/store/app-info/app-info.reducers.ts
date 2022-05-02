import { createReducer } from '@reduxjs/toolkit';

import { createEntity } from '../utils/entity.utils';

import { generateRandomBalanceValueAction } from './app-info.actions';
import { appInfoInitialState, AppInfoState } from './app-info.state';

export const appInfoReducers = createReducer<AppInfoState>(appInfoInitialState, builder => {
  builder.addCase(generateRandomBalanceValueAction.submit, state => ({
    ...state,
    randomBalance: createEntity(state.randomBalance.data, true)
  }));
  builder.addCase(generateRandomBalanceValueAction.success, (state, { payload }) => ({
    ...state,
    randomBalance: createEntity(payload, false)
  }));
  builder.addCase(generateRandomBalanceValueAction.fail, (state, { payload: error }) => ({
    ...state,
    randomBalance: createEntity(state.randomBalance.data, false, error)
  }));
});
