import { dAppsInitialState } from './d-apps/d-apps.state';
import { securityInitialState } from './security/security-state';
import { settingsInitialState } from './settings/settings.state';
import { RootState } from './store';
import { swapInitialState } from './swap/swap.state';
import { tokensMarketInfoInitialState } from './tokens-market-info/tokens-market-info.state';
import { walletInitialState } from './wallet/wallet.state';

export const initialRootState: RootState = {
  wallet: walletInitialState,
  dApps: dAppsInitialState,
  tokensMarketInfo: tokensMarketInfoInitialState,
  settings: settingsInitialState,
  swap: swapInitialState,
  security: securityInitialState
};
