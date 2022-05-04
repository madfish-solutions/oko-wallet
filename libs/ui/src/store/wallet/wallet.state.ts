import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { mockHdAccount } from '../../mocks/account.interface.mock';
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

export const walletInitialState: WalletState = {
  accounts: [mockHdAccount],
  selectedAccountPublicKeyHash: '0x84757a438E06631f34b2199B5D92e6865cE47D50',
  gasToken: GasTokensMetadata['Klaytn Mainnet'],
  gasTokenBalance: createEntity('0')
};
