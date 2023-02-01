import { createReducer } from '@reduxjs/toolkit';

import { formatUnits, getFormattedBalance } from '../../utils/units.utils';
import { createEntity } from '../utils/entity.utils';

import {
  setSlippageToleranceAction,
  loadTokenAllowanceAction,
  loadQuoteAction,
  approveAllowanceAction,
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
      exchangeRate: createEntity(state.exchangeRate.data, true),
      outputAmount: createEntity(state.outputAmount.data, true),
      routes: createEntity(state.routes.data, true)
    }))
    .addCase(loadQuoteAction.fail, (state, { payload: error }) => ({
      ...state,
      exchangeRate: createEntity(state.exchangeRate.data, false),
      outputAmount: createEntity(state.outputAmount.data, false),
      routes: createEntity(state.routes.data, false, error)
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
          outputAmount: createEntity(outputAmount),
          exchangeRate: createEntity(`1 ${fromToken.symbol} = ${exchangeRate} ${toToken.symbol}`),
          routes: createEntity(protocols)
        };
      }
    )
    .addCase(approveAllowanceAction.submit, (state, { payload: { fromToken } }) => ({
      ...state,
      approveAllowanceLoading: {
        ...state.approveAllowanceLoading,
        [fromToken.tokenAddress]: true
      }
    }))
    .addCase(approveAllowanceAction.success, (state, { payload: tokenAddress }) => {
      const approveAllowanceLoadingCopy = { ...state.approveAllowanceLoading };
      delete approveAllowanceLoadingCopy[tokenAddress];

      return {
        ...state,
        approveAllowanceLoadingCopy
      };
    })
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
