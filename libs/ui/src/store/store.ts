import { settingsEpics } from './settings/settings.epics';
import { settingsReducers } from './settings/settings.reducers';
import { SettingsRootState } from './settings/settings.state';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState & SettingsRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers,
    settings: settingsReducers
  },
  epics: [walletEpics, settingsEpics]
});
