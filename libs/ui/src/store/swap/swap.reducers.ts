import { createReducer } from '@reduxjs/toolkit';

import { formatUnits, getFormattedBalance } from '../../utils/units.utils';
import { createEntity } from '../utils/entity.utils';

import {
  setSlippageToleranceAction,
  loadTokenAllowanceAction,
  loadQuoteAction,
  loadSwapDataAction,
  resetSwapAction
} from './swap.actions';
import { swapInitialState, SwapState } from './swap.state';

export const swapReducers = createReducer<SwapState>(swapInitialState, builder => {
  builder
    .addCase(setSlippageToleranceAction, (state, { payload: slippageTolerance }) => ({
      ...state,
      slippageTolerance
    }))
    .addCase(loadTokenAllowanceAction.submit, state => ({
      ...state,
      allowance: createEntity(state.allowance.data, true)
    }))
    .addCase(loadTokenAllowanceAction.success, (state, { payload: allowance }) => ({
      ...state,
      allowance: createEntity(allowance)
    }))
    .addCase(loadQuoteAction.submit, state => ({
      ...state,
      quote: createEntity(state.quote.data, true)
    }))
    .addCase(loadQuoteAction.fail, (state, { payload: error }) => ({
      ...state,
      quote: createEntity(state.quote.data, false, error)
    }))
    .addCase(
      loadQuoteAction.success,
      (state, { payload: { fromToken, toToken, fromTokenAmount, toTokenAmount, protocols } }) => {
        const outputAmount = getFormattedBalance(toTokenAmount, toToken.decimals).toString();
        const exchangeRate = formatUnits(toTokenAmount, toToken.decimals)
          .div(formatUnits(fromTokenAmount, fromToken.decimals))
          .toFixed(4);

        return {
          ...state,
          quote: createEntity({
            outputAmount,
            routes: protocols,
            exchangeRate: `1 ${fromToken.symbol} = ${exchangeRate} ${toToken.symbol}`
          })
        };
      }
    )
    .addCase(loadSwapDataAction.submit, state => ({
      ...state,
      swapData: createEntity(state.swapData, true)
    }))
    .addCase(loadSwapDataAction.success, state => ({
      ...state,
      swapData: createEntity(state.swapData, false)
    }))
    .addCase(loadSwapDataAction.fail, (state, { payload: error }) => ({
      ...state,
      swapData: createEntity(state.swapData, false, error)
    }))
    .addCase(resetSwapAction, state => ({
      ...swapInitialState,
      slippageTolerance: state.slippageTolerance
    }));
});
