import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { defaultTokensMetadata } from '../../constants/tokens';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface, Transactions } from '../../interfaces/account.interface';
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
  transactions: Record<NetworkRpcUrWithPublicKeyHash, Transactions[]>;
}

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  tokensMetadata: defaultTokensMetadata,
  accountsTokens: {},
  transactions: {}
};
