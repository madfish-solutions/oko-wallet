import { createReducer } from '@reduxjs/toolkit';

import { setIsAnalyticsEnabled, setIsBiometricEnabled } from './settings.actions';
import { settingsInitialState, SettingsState } from './settings.state';

export const settingsReducers = createReducer<SettingsState>(settingsInitialState, builder => {
  builder
    .addCase(setIsAnalyticsEnabled, (state, { payload: isAnalyticsEnabled }) => ({
      ...state,
      isAnalyticsEnabled
    }))
    .addCase(setIsBiometricEnabled, (state, { payload: isBiometricEnabled }) => ({
      ...state,
      isBiometricEnabled
    }));
});