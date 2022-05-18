import { createReducer } from '@reduxjs/toolkit';

import { unlockAppAction } from './app-info.actions';
import { appInfoInitialState, AppInfoState } from './app-info.state';

export const appInfoReducers = createReducer<AppInfoState>(appInfoInitialState, builder => {
  builder.addCase(unlockAppAction, (state, { payload }) => ({
    ...state,
    isUnlocked: payload
  }));
});
