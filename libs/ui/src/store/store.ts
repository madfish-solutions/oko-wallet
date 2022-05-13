import { appInfoEpics } from './app-info/app-info.epics';
import { appInfoReducers } from './app-info/app-info.reducers';
import { AppInfoRootState } from './app-info/app-info.state';
import { createStore } from './utils/create-store';
import { WalletRootState } from './wallet/types';
import { walletReducers } from './wallet/wallet.reducers';

export type RootState = AppInfoRootState & WalletRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    appInfo: appInfoReducers,
    wallet: walletReducers
  },
  epics: [appInfoEpics]
});
