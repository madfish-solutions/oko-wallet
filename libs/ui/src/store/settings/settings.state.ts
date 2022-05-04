import { NetworksNameEnum } from '../../enums/network.enum';

export interface SettingsRootState {
  settings: SettingsState;
}

export interface SettingsState {
  network: string;
}

export const settingsInitialState: SettingsState = {
  network: NetworksNameEnum.KlaytnMainnet
};
