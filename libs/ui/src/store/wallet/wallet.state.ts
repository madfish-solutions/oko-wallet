import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { defaultTokensMetadata } from '../../constants/tokens';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface, Transaction } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

type NetworkChainIdWithTokenAddress = string;
type NetworkChainIdWithPublicKeyHash = string;

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  networks: NetworkInterface[];
  selectedNetworkRpcUrl: string;
  selectedNetworkChainId: string;
  tokensMetadata: Record<NetworkChainIdWithTokenAddress, TokenMetadata>;
  accountsTokens: Record<NetworkChainIdWithPublicKeyHash, AccountToken[]>;
  transactions: Record<NetworkChainIdWithPublicKeyHash, Transaction[]>;
}

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  selectedNetworkChainId: NETWORKS_DEFAULT_LIST[0].chainId,
  tokensMetadata: defaultTokensMetadata,
  accountsTokens: {},
  transactions: {}
};
