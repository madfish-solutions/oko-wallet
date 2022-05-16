import { createStore } from './utils/create-store';
import { WalletRootState } from './wallet/types';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';

export type RootState = WalletRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers
  },
  epics: [walletEpics]
});
