import { AccountInterface } from 'shared';

import { NETWORKS_DEFAULT_LIST } from '../../constants/networks';
import { defaultTokensMetadata } from '../../constants/tokens';
import { AccountToken } from '../../interfaces/account-token.interface';
import { DappConnectionInfo } from '../../interfaces/dapp-connection.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';
import { Transaction } from '../../interfaces/transaction.interfaces';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';

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
  tokensMetadata: Record<NetworkChainIdWithTokenAddress, TokenMetadata>;
  accountsTokens: Record<NetworkChainIdWithPublicKeyHash, AccountToken[]>;
  accountsGasTokens: Record<NetworkChainIdWithPublicKeyHash, LoadableEntityState<string>>;
  transactions: Record<NetworkChainIdWithPublicKeyHash, Transaction[]>;
  confirmedEVMDappConnection: Record<string, DappConnectionInfo>;
}

export const walletInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  networks: NETWORKS_DEFAULT_LIST,
  selectedNetworkRpcUrl: NETWORKS_DEFAULT_LIST[0].rpcUrl,
  tokensMetadata: defaultTokensMetadata,
  accountsTokens: {},
  accountsGasTokens: {},
  transactions: {},
  confirmedEVMDappConnection: {}
};
