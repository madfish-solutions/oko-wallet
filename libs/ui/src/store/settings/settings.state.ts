import { NETWORKS } from '../../constants/networks';
import { NetworksNameEnum } from '../../enums/networks.enum';
import { NetworksType } from '../../types/networks.type';

export interface SettingsRootState {
  settings: SettingsState;
}

export interface SettingsState {
  networks: NetworksType;
  selectedNetwork: string;
}

export const settingsInitialState: SettingsState = {
  networks: NETWORKS,
  selectedNetwork: NETWORKS[NetworksNameEnum.KlaytnMainnet].name
};
