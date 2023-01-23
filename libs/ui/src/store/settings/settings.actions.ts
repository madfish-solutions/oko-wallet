import { createAction } from '@reduxjs/toolkit';

import { SettingsState } from './settings.state';

export const setIsAnalyticsEnabled = createAction<boolean>('settings/SET_IS_ANALYTICS_ENABLED');
export const setIsBiometricEnabled = createAction<boolean>('settings/SET_IS_BIOMETRIC_ENABLED');
export const showLoaderAction = createAction('settings/SHOW_LOADER');
export const hideLoaderAction = createAction('settings/HIDE_LOADER');
export const setAppLockTimePeriod = createAction<number>('settings/SET_APP_LOCK_TIME_PERIOD');
export const setSlippageToleranceAction =
  createAction<SettingsState['slippageTolerance']>('settings/SLIPPAGE_TOLERANCE');
