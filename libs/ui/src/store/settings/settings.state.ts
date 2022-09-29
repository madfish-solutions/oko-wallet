export interface SettingsRootState {
  settings: SettingsState;
}

export interface SettingsState {
  isAnalyticsEnabled: boolean;
}

export const settingsInitialState: SettingsState = {
  isAnalyticsEnabled: true
};
