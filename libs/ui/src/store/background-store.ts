import { backgroundDappsReducers } from './dapps/background-state/dapps.reducers';
import { DAppsRootState } from './dapps/dapps.state';
import { createStore } from './utils/create-store';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type BackgroundRootState = DAppsRootState & WalletRootState;

export const createBackgroundStore = () =>
  createStore<BackgroundRootState>({
    reducers: {
      dApps: backgroundDappsReducers,
      wallet: walletReducers
    },
    epics: []
  });
