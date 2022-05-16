import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';

type NetworkRpcUrlWithTokenAddress = string;
type NetworkRpcUrWithPublicKeyHash = string;

export interface WalletRootState {
  wallet: WalletState;
}

export interface AccountTokenInfo {
  tokenAddress: string;
  isVisible: boolean;
  balance?: string;
}

export interface TokenMetadata {
  address: string;
  name: string;
  decimals?: string;
  imageUrl?: string;
}

export type AllAccountTokens = AccountTokenInfo & Omit<TokenMetadata, 'decimals' | 'address'>;

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  networks: NetworkInterface[];
  selectedNetworkRpcUrl: string;
  tokensMetadata: Record<NetworkRpcUrlWithTokenAddress, TokenMetadata>;
  settings: Record<NetworkRpcUrWithPublicKeyHash, AccountTokenInfo[]>;
}
