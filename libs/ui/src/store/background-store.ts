import { backgroundDappsReducers } from './dapps/background-state/dapps.reducers';
import { DappsRootState } from './dapps/dapps.state';
import { createStore } from './utils/create-store';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type BackgroundRootState = DappsRootState & WalletRootState;

export const createBackgroundStore = () =>
  createStore<BackgroundRootState>({
    reducers: {
      dapps: backgroundDappsReducers,
      wallet: walletReducers
    },
    epics: []
  });
