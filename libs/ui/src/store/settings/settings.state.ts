import { lockTimes } from '../../screens/settings/screens/lock-time-selector/constants';

export interface SettingsRootState {
  settings: SettingsState;
}

export interface SettingsState {
  isAnalyticsEnabled: boolean;
  isBiometricEnabled: boolean;
  showLoader: boolean;
  lockTimePeriod: number;
}

export const settingsInitialState: SettingsState = {
  isAnalyticsEnabled: true,
  isBiometricEnabled: false,
  showLoader: false,
  lockTimePeriod: lockTimes[0].value
};
