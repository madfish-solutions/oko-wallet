import { WalletState } from './types';

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  tokensMetadata: {},
  settings: {},
  selectedNetwork: 'Klaytn Mainnet'
};
