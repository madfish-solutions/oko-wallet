import { useSelector } from 'react-redux';

import { SettingsRootState, SettingsState } from './settings.state';

export const useGetNetworkSelector = () =>
  useSelector<SettingsRootState, SettingsState['network']>(({ settings }) => settings.network);
