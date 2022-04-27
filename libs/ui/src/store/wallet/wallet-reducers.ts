import { createReducer } from '@reduxjs/toolkit';

import { getTokenSlug } from '../../utils/get-token-slug.util';

import { addTokenMetadataAction } from './wallet-actions';
import { walletInitialState, WalletState } from './wallet-state';

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(addTokenMetadataAction, (state, { payload }) => {
    const slug = getTokenSlug(payload);

    return {
      ...state,
      tokensMetadata: {
        ...state.tokensMetadata,
        [slug]: payload
      }
    };
  });
});
