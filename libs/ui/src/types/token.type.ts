import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

export type TokenType = {
  address: string;
  tokenId?: string | number | undefined;
  name?: string;
  symbol?: string;
  thumbnailUri?: string;
  decimals?: number;
};

export type TokenWithBalanceType = {
  gasToken: TokenType;
  gasTokenBalance: string;
};

export type TokenWithEntityBalanceType = {
  gasToken: TokenType;
  gasTokenBalance: LoadableEntityState<string>;
};
