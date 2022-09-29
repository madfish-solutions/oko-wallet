import { useSelector } from 'react-redux';

import { SettingsRootState } from './settings.state';

export const useAnalyticsEnabledSelector = () =>
  useSelector<SettingsRootState, boolean>(({ settings }) => settings.isAnalyticsEnabled);
