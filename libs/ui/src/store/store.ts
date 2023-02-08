import { dAppsReducers } from './d-apps/d-apps.reducers';
import { dAppsInitialState, DAppsRootState } from './d-apps/d-apps.state';
import { rootStateEpics } from './root-state.epics';
import { settingsReducers } from './settings/settings.reducers';
import { settingsInitialState, SettingsRootState } from './settings/settings.state';
import { swapEpics } from './swap/swap.epics';
import { swapReducers } from './swap/swap.reducers';
import { swapInitialState, SwapRootState } from './swap/swap.state';
import { tokenMarketInfoEpics } from './tokens-market-info/token-market-info.epics';
import { tokensMarketInfoReducers } from './tokens-market-info/tokens-market-info.reducers';
import { tokensMarketInfoInitialState, TokensMarketInfoRootState } from './tokens-market-info/tokens-market-info.state';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { walletInitialState, WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState &
  DAppsRootState &
  TokensMarketInfoRootState &
  SettingsRootState &
  SwapRootState;

export const initialRootState: RootState = {
  wallet: walletInitialState,
  dApps: dAppsInitialState,
  tokensMarketInfo: tokensMarketInfoInitialState,
  settings: settingsInitialState,
  swap: swapInitialState
};

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers,
    dApps: dAppsReducers,
    tokensMarketInfo: tokensMarketInfoReducers,
    settings: settingsReducers,
    swap: swapReducers
  },
  epics: [walletEpics, rootStateEpics, tokenMarketInfoEpics, swapEpics]
});
