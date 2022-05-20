import { LoadableEntityState } from '../store/interfaces/loadable-entity-state.interface';

export interface AccountToken {
  tokenAddress: string;
  isVisible: boolean;
  balance: LoadableEntityState<string>;
}
