import { createReducer } from '@reduxjs/toolkit';

import { getTokensListAction } from './tokens-actions';
import { tokensInitialState, TokensState } from './tokens-state';

export const tokensReducers = createReducer<TokensState>(tokensInitialState, builder => {
  // TODO: Add tokens list from payload
  builder.addCase(getTokensListAction, state => ({
    ...state,
    tokenList: []
  }));
});
