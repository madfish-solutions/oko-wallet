import { createReducer } from '@reduxjs/toolkit';

import { setIsAnalyticsEnabled } from './settings.actions';
import { settingsInitialState, SettingsState } from './settings.state';

export const settingsReducers = createReducer<SettingsState>(settingsInitialState, builder => {
  builder.addCase(setIsAnalyticsEnabled, (state, { payload: isAnalyticsEnabled }) => ({
    ...state,
    isAnalyticsEnabled
  }));
});
