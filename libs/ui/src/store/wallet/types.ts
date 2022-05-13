import { AccountInterface } from '../interfaces/account.interface';

type NetworkName = string;

export interface WalletRootState {
  wallet: WalletState;
}

export interface AccountTokenInfo {
  tokenAddress: string;
  isVisible: boolean;
}

export interface TokenMetadata {
  tokenAddress: string;
  name: string;
  decimals?: string;
  url?: string;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  tokensMetadata: Record<NetworkName, Record<TokenMetadata['tokenAddress'], TokenMetadata>>;
  settings: Record<NetworkName, Record<WalletState['selectedAccountPublicKeyHash'], AccountTokenInfo[]>>;
  selectedNetwork: NetworkName;
}
