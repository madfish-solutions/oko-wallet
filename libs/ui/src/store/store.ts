import { DappsReducers } from './dapps/dapps.reducers';
import { DappsRootState } from './dapps/dapps.state';
import { rootStateEpics } from './root-state.epics';
import { settingsReducers } from './settings/settings.reducers';
import { SettingsRootState } from './settings/settings.state';
import { tokenMarketInfoEpics } from './tokens-market-info/token-market-info.epics';
import { tokensMarketInfoReducers } from './tokens-market-info/tokens-market-info.reducers';
import { TokensMarketInfoRootState } from './tokens-market-info/tokens-market-info.state';
import { createStore } from './utils/create-store';
import { walletEpics } from './wallet/wallet.epics';
import { walletReducers } from './wallet/wallet.reducers';
import { WalletRootState } from './wallet/wallet.state';

export type RootState = WalletRootState & DappsRootState & TokensMarketInfoRootState & SettingsRootState;

export const createAppStore = () =>
  createStore<RootState>({
    reducers: {
      wallet: walletReducers,
      dapps: DappsReducers,
      tokensMarketInfo: tokensMarketInfoReducers,
      settings: settingsReducers
    },
    epics: [walletEpics, rootStateEpics, tokenMarketInfoEpics]
  });
