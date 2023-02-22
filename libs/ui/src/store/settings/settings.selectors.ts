import { useSelector } from 'react-redux';

import { SettingsRootState } from './settings.state';

export const useAnalyticsEnabledSelector = () =>
  useSelector<SettingsRootState, boolean>(({ settings }) => settings.isAnalyticsEnabled);

export const useBiometricEnabledSelector = () =>
  useSelector<SettingsRootState, boolean>(({ settings }) => settings.isBiometricEnabled);

export const useShowLoaderSelector = () =>
  useSelector<SettingsRootState, boolean>(({ settings }) => settings.showLoader);

export const useLockTimePeriodSelector = () =>
  useSelector<SettingsRootState, number>(({ settings }) => settings.lockTimePeriod);

export const useFirstAppLaunchSelector = () =>
  useSelector<SettingsRootState, boolean>(({ settings }) => settings.isFirstAppLaunch);
