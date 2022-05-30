import { rootStateEpics } from './root-state-epics';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers
  },
  epics: [walletEpics, rootStateEpics]
});
