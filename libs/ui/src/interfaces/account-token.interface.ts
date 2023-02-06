import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

export interface AccountToken {
  tokenAddress: string;
  tokenId?: string;
  isVisible: boolean;
  balance: LoadableEntityState<string>;
  fiatBalance?: number;
}
