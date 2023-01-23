import { createReducer } from '@reduxjs/toolkit';

import {
  hideLoaderAction,
  setAppLockTimePeriod,
  setIsAnalyticsEnabled,
  setIsBiometricEnabled,
  setSlippageToleranceAction,
  showLoaderAction
} from './settings.actions';
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
    }))
    .addCase(showLoaderAction, state => ({
      ...state,
      showLoader: true
    }))
    .addCase(hideLoaderAction, state => ({
      ...state,
      showLoader: false
    }))
    .addCase(setAppLockTimePeriod, (state, { payload: lockTimePeriod }) => ({
      ...state,
      lockTimePeriod
    }))
    .addCase(setSlippageToleranceAction, (state, { payload: slippageTolerance }) => ({
      ...state,
      slippageTolerance
    }));
});
