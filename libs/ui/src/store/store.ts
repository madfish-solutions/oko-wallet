import { dAppsReducers } from './d-apps/d-apps.reducers';
import { DAppsRootState } from './d-apps/d-apps.state';
import { rootStateEpics } from './root-state.epics';
import { securityReducers } from './security/security-reducers';
import { SecurityRootState } from './security/security-state';
import { settingsReducers } from './settings/settings.reducers';
import { SettingsRootState } from './settings/settings.state';
import { swapEpics } from './swap/swap.epics';
import { swapReducers } from './swap/swap.reducers';
import { SwapRootState } from './swap/swap.state';
import { tokenMarketInfoEpics } from './tokens-market-info/token-market-info.epics';
import { tokensMarketInfoReducers } from './tokens-market-info/tokens-market-info.reducers';
import { TokensMarketInfoRootState } from './tokens-market-info/tokens-market-info.state';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState &
  DAppsRootState &
  TokensMarketInfoRootState &
  SettingsRootState &
  SwapRootState &
  SecurityRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    wallet: walletReducers,
    dApps: dAppsReducers,
    tokensMarketInfo: tokensMarketInfoReducers,
    settings: settingsReducers,
    swap: swapReducers,
    security: securityReducers
  },
  epics: [walletEpics, rootStateEpics, tokenMarketInfoEpics, swapEpics]
});
