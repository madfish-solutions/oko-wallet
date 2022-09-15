export interface TokensMarketInfoRootState {
  tokensMarketInfo: TokensMarketInfoState;
}

export interface TokenPriceInfo {
  price: number;
  changeInPrice24h: number;
}

export interface TokensMarketInfoState {
  tokensPriceInfo: Record<string, TokenPriceInfo>;
}

export const TokensMarketInfoInitialState: TokensMarketInfoState = {
  tokensPriceInfo: {}
};
