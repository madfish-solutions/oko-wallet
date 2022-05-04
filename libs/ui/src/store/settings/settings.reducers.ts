import { createReducer } from '@reduxjs/toolkit';

import { changeNetworkAction } from './settings.actions';
import { settingsInitialState, SettingsState } from './settings.state';

export const settingsReducers = createReducer<SettingsState>(settingsInitialState, builder => {
  builder.addCase(changeNetworkAction, (state, { payload: network }) => ({
    ...state,
    network
  }));
});
