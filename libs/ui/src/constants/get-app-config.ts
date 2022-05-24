import { IAppConfig } from '../interfaces/app-config.inrerface';
import { getRpcEngine } from '../utils/get-rpc-engine';

import { SUPPORTED_CHAINS } from './chains';
import { ETH_STANDARD_PATH, MAINNET_CHAIN_ID } from './defaults';

const appConfig = {
  name: 'WalletConnect',
  logo: '',
  chainId: MAINNET_CHAIN_ID,
  derivationPath: ETH_STANDARD_PATH,
  numberOfAccounts: 1,
  colors: {
    defaultColor: '12, 12, 13',
    backgroundColor: '40, 44, 52'
  },
  chains: SUPPORTED_CHAINS,
  styleOpts: {
    showPasteUri: true,
    showVersion: true
  },
  rpcEngine: getRpcEngine(),
  events: {
    init: () => Promise.resolve(),
    update: () => Promise.resolve()
  }
};

export function getAppConfig(): IAppConfig {
  return appConfig;
}
