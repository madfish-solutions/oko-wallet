import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { TokenType } from '../../types/token.type';
import { AccountInterface } from '../interfaces/account.interface';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { createEntity } from '../utils/entity.utils';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  gasToken: TokenType;
  gasTokenBalance: LoadableEntityState<string>;
}

export const appInfoInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  gasToken: GasTokensMetadata['Klaytn Mainnet'],
  gasTokenBalance: createEntity('0')
};
