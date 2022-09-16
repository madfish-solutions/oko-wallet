import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { defaultTokensMetadata } from '../../constants/tokens';
import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface, Transaction } from '../../interfaces/account.interface';
import { DappConnectionInfo } from '../../interfaces/dapp-connection.interface';
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
  selectedNetworkChainId: string;
  tokensMetadata: Record<NetworkChainIdWithTokenAddress, TokenMetadata>;
  accountsTokens: Record<NetworkChainIdWithPublicKeyHash, AccountToken[]>;
  transactions: Record<NetworkChainIdWithPublicKeyHash, Transaction[]>;
  confirmedEVMDappConnection: Record<string, DappConnectionInfo>;
}

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkChainId: NETWORKS_DEFAULT_LIST[0].chainId,
  tokensMetadata: defaultTokensMetadata,
  accountsTokens: {},
  transactions: {},
  confirmedEVMDappConnection: {}
};
