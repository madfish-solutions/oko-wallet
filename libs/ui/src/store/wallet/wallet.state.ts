import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accountsByBlockchain: Record<string, AccountInterface[]>;
  selectedAccountPublicKeyHash: string;
  networks: NetworkInterface[];
  selectedNetworkRpcUrl: string;
  selectedBlockchain: string;
}

export const walletInitialState: WalletState = {
  accountsByBlockchain: {},
  selectedAccountPublicKeyHash: '',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  selectedBlockchain: 'Ethereum'
};
