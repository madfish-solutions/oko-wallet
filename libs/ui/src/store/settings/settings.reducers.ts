import { createReducer } from '@reduxjs/toolkit';

import { resetKeychainOnInstallAction } from '../root-state.actions';

import {
  hideLoaderAction,
  setAppLockTimePeriod,
  setIsAnalyticsEnabled,
  setIsBiometricEnabled,
  showLoaderAction
} from './settings.actions';
import { settingsInitialState, SettingsState } from './settings.state';

export const settingsReducers = createReducer<SettingsState>(settingsInitialState, builder => {
  builder
    .addCase(resetKeychainOnInstallAction.success, state => ({
      ...state,
      isFirstAppLaunch: false
    }))
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
    }));
});
