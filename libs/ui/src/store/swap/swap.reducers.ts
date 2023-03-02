import { createReducer } from '@reduxjs/toolkit';

import { getSwapExchangeRate } from '../../utils/get-swap-exchange-rate.util';
import { getFormattedBalance } from '../../utils/units.utils';
import { createEntity } from '../utils/entity.utils';

import {
  setSlippageToleranceAction,
  loadTokenAllowanceAction,
  loadQuoteAction,
  loadSwapDataAction,
  resetSwapAction,
  changeApproveAllowanceDataAction,
  waitForApproveTxToBeSuccessAction
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
        const exchangeRate = getSwapExchangeRate(fromToken, fromTokenAmount, toToken, toTokenAmount);

        return {
          ...state,
          quote: createEntity({
            outputAmount,
            routes: protocols,
            exchangeRate
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
    .addCase(changeApproveAllowanceDataAction, (state, { payload: approveAllowanceData }) => ({
      ...state,
      approveAllowanceData
    }))
    .addCase(waitForApproveTxToBeSuccessAction.submit, (state, { payload: { token } }) => ({
      ...state,
      approveAllowanceTxLoading: {
        ...state.approveAllowanceTxLoading,
        [token.tokenAddress]: true
      }
    }))
    .addCase(waitForApproveTxToBeSuccessAction.success, (state, { payload: tokenAddress }) => {
      const approveAllowanceTxLoading = { ...state.approveAllowanceTxLoading };
      delete approveAllowanceTxLoading[tokenAddress];

      return {
        ...state,
        approveAllowanceTxLoading
      };
    })
    .addCase(resetSwapAction, state => ({
      ...swapInitialState,
      slippageTolerance: state.slippageTolerance
    }));
});
