import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { mockHdAccount } from '../../mocks/account.interface.mock';

import { WalletState } from './types';

export const walletInitialState: WalletState = {
  accounts: [mockHdAccount],
  selectedAccountPublicKeyHash: '0x84757a438E06631f34b2199B5D92e6865cE47D50',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  tokensMetadata: {},
  settings: {}
};
