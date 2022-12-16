export interface SettingsRootState {
  settings: SettingsState;
}

export interface SettingsState {
  isAnalyticsEnabled: boolean;
  isBiometricEnabled: boolean;
  showLoader: boolean;
}

export const settingsInitialState: SettingsState = {
  isAnalyticsEnabled: true,
  isBiometricEnabled: false,
  showLoader: false
};
