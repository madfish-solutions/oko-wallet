import { useSelector } from 'react-redux';

import { SettingsRootState, SettingsState } from './settings.state';

export const useGetNetworkSelector = () =>
  useSelector<SettingsRootState, SettingsState['selectedNetwork']>(({ settings }) => settings.selectedNetwork);

export const useGetAllNetworks = () =>
  useSelector<SettingsRootState, SettingsState['networks']>(({ settings }) => settings.networks);

export const useGetAllNetworksNameSelector = () =>
  useSelector<SettingsRootState, string[]>(({ settings }) =>
    Object.values(settings.networks).map(network => network.name)
  );
