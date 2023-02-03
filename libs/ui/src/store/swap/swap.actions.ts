import { createAction } from '@reduxjs/toolkit';

import { GetQuoteResponse } from '../../api/1inch/types';
import { Token } from '../../interfaces/token.interface';
import { createActions } from '../utils/action.utils';

import { SwapState } from './swap.state';

export const setSlippageToleranceAction = createAction<SwapState['slippageTolerance']>('swap/SLIPPAGE_TOLERANCE');

export const loadTokenAllowanceAction = createActions<Token['tokenAddress'], string>('swap/LOAD_TOKEN_ALLOWANCE');

export const loadQuoteAction = createActions<
  { fromToken: Token; toToken: Token; amount: string },
  GetQuoteResponse & { fromToken: Token; toToken: Token }
>('swap/LOAD_QUOTE');

export const loadSwapDataAction = createActions<{
  fromToken: Token;
  toToken: Token;
  amount: string;
  slippageTolerance: string;
}>('swap/LOAD_SWAP_DATA');

export const resetSwapAction = createAction('swap/RESET_SWAP');
