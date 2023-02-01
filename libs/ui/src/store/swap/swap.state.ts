import { GetQuoteResponse, SwapData } from '../../api/1inch/types';
import { Token } from '../../interfaces/token.interface';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { createEntity } from '../utils/entity.utils';

export interface SwapRootState {
  swap: SwapState;
}

export interface SwapState {
  slippageTolerance: string;
  allowance: LoadableEntityState<string>;
  exchangeRate: LoadableEntityState<string>;
  outputAmount: LoadableEntityState<string>;
  routes: LoadableEntityState<GetQuoteResponse['protocols']>;
  approveAllowanceLoading: Record<Token['tokenAddress'], boolean>;
  swapData: LoadableEntityState<SwapData | object>;
}

export const swapInitialState: SwapState = {
  slippageTolerance: '0.5',
  allowance: createEntity(''),
  exchangeRate: createEntity(''),
  outputAmount: createEntity(''),
  routes: createEntity([]),
  approveAllowanceLoading: {},
  swapData: createEntity({})
};
