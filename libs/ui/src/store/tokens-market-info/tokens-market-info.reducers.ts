import { createReducer } from '@reduxjs/toolkit';
import isEmpty from 'lodash/isEmpty';

import { GAS_TOKEN_ADDRESS } from '../../constants/defaults';
import { getTokenMetadataSlug } from '../../utils/token-metadata.util';

import { loadTokensPriceInfo } from './tokens-market-info.actions';
import { TokensMarketInfoState, tokensMarketInfoInitialState, TokenPriceInfo } from './tokens-market-info.state';

export const tokensMarketInfoReducers = createReducer<TokensMarketInfoState>(tokensMarketInfoInitialState, builder => {
  builder.addCase(loadTokensPriceInfo.success, (state, { payload }) => {
    const tokensPriceInfo: Record<string, TokenPriceInfo> = {};

    if (!isEmpty(payload.gasTokenPriceInfo)) {
      const tokenMetadataSlug = getTokenMetadataSlug(payload.chainId, GAS_TOKEN_ADDRESS);
      const [gasTokenPriceInfo] = Object.entries(payload.gasTokenPriceInfo);
      const { usd, usd_24h_change } = gasTokenPriceInfo[1];

      tokensPriceInfo[tokenMetadataSlug] = {
        price: usd ?? 0,
        usdPriceChange24h: usd_24h_change
      };
    }

    for (const [tokenAddress, { usd, usd_24h_change }] of Object.entries(payload.tokensPriceInfo)) {
      const tokenMetadataSlug = getTokenMetadataSlug(payload.chainId, tokenAddress);

      tokensPriceInfo[tokenMetadataSlug] = {
        price: usd ?? 0,
        usdPriceChange24h: usd_24h_change
      };
    }

    return {
      ...state,
      tokensPriceInfo: {
        ...state.tokensPriceInfo,
        ...tokensPriceInfo
      }
    };
  });
});
