import { GetQuoteResponse } from '../../api/1inch/types';
import { Token } from '../../interfaces/token.interface';
import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { createEntity } from '../utils/entity.utils';

export interface SwapRootState {
  swap: SwapState;
}

export interface SwapState {
  slippageTolerance: string;
  allowance: LoadableEntityState<string>;
  approveAllowanceData: string;
  approveAllowanceTxLoading: Record<Token['tokenAddress'], boolean>;
  quote: LoadableEntityState<{
    exchangeRate: string;
    outputAmount: string;
    routes: GetQuoteResponse['protocols'];
  }>;
  swapData: LoadableEntityState<object>;
}

export const swapInitialState: SwapState = {
  slippageTolerance: '0.5',
  allowance: createEntity(''),
  quote: createEntity({
    exchangeRate: '',
    outputAmount: '',
    routes: []
  }),
  swapData: createEntity({}),
  approveAllowanceData: '',
  approveAllowanceTxLoading: {}
};
