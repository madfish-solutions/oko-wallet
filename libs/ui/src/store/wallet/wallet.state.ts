import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { mockHdAccount } from '../../mocks/account.interface.mock';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  networks: NetworkInterface[];
  selectedNetworkRpcUrl: string;
}

export const walletInitialState: WalletState = {
  accounts: [mockHdAccount],
  selectedAccountPublicKeyHash: '0x84757a438E06631f34b2199B5D92e6865cE47D50',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  tokensMetadata: {},
  settings: {},
};
