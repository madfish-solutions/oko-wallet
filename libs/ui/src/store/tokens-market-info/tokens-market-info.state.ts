export interface TokensMarketInfoRootState {
  tokensMarketInfo: TokensMarketInfoState;
}

export interface TokenPriceInfo {
  price: number;
  usdPriceChange24h: number;
}

export interface TokensMarketInfoState {
  tokensPriceInfo: Record<string, TokenPriceInfo>;
}

export const tokensMarketInfoInitialState: TokensMarketInfoState = {
  tokensPriceInfo: {}
};
