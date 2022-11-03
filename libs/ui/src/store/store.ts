import { DappsReducers } from './background-script/dapps.reducers';
import { rootStateEpics } from './root-state.epics';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { DappsRootState, WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState & DappsRootState;

export const createStore2 = () =>
  createStore<RootState>({
    reducers: {
      wallet: walletReducers,
      dapps: DappsReducers
    },
    epics: [walletEpics, rootStateEpics]
  });
