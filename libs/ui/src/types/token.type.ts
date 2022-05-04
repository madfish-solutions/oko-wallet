export type TokenType = {
  address: string;
  tokenId?: string | number | undefined;
  name?: string;
  symbol?: string;
  thumbnailUri?: string;
  decimals?: number;
};

export type TokenWithBalanceType = {
  gasToken: TokenType;
  gasTokenBalance: string;
};
