import { appInfoReducers } from './app-info/app-info.reducers';
import { AppInfoRootState } from './app-info/app-info.state';
import { createStore } from './utils/create-store';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = AppInfoRootState & WalletRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    appInfo: appInfoReducers,
    wallet: walletReducers
  },
  epics: []
});
