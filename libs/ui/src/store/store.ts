import { appInfoReducers } from './app-info/app-info.reducers';
import { AppInfoRootState } from './app-info/app-info.state';
import { rootStateEpics } from './root-state-epics';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState & AppInfoRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers,
    appInfo: appInfoReducers
  },
  epics: [walletEpics, rootStateEpics]
});
