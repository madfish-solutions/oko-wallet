import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

export interface AccountToken {
  tokenId: string;
  tokenAddress: string;
  isVisible: boolean;
  balance: LoadableEntityState<string>;
}
