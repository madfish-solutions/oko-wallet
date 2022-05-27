import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

type NetworkRpcUrlWithTokenAddress = string;
type NetworkRpcUrWithPublicKeyHash = string;

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  networks: NetworkInterface[];
  selectedNetworkRpcUrl: string;
  tokensMetadata: Record<NetworkRpcUrlWithTokenAddress, TokenMetadata>;
  accountsTokens: Record<NetworkRpcUrWithPublicKeyHash, AccountToken[]>;
}

export const ACCOUNT_1 = '0x84757a438E06631f34b2199B5D92e6865cE47D50';
export const ACCOUNT_2 = '0xf092a925F576444E438450A16615a3D70C622cfa';

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: ACCOUNT_1,
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  tokensMetadata: {},
  accountsTokens: {}
};
