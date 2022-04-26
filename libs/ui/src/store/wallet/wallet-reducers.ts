import { createReducer } from "@reduxjs/toolkit";

import { addTokenMetadataAction } from "./wallet-actions";
import { walletInitialState, WalletState } from "./wallet-state";

import { getTokenSlug } from "../../utils/get-token-slug.util";

export const walletReducers = createReducer<WalletState>(walletInitialState, builder => {
  builder.addCase(addTokenMetadataAction, (state, { payload }) => {
    const slug = getTokenSlug(payload);
    
    return {
      ...state,
      tokensMetadata: {
        ...state.tokensMetadata,
        [slug]: payload,
      }
    };
  });
});
