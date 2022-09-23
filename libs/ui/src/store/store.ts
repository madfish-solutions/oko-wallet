import { rootStateEpics } from './root-state.epics';
import { tokenMarketInfoEpics } from './tokens-market-info/token-market-info.epics';
import { tokensMarketInfoReducers } from './tokens-market-info/tokens-market-info.reducers';
import { TokensMarketInfoRootState } from './tokens-market-info/tokens-market-info.state';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState & TokensMarketInfoRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers,
    tokensMarketInfo: tokensMarketInfoReducers
  },
  epics: [walletEpics, tokenMarketInfoEpics, rootStateEpics]
});
