export interface TokenMetadata {
  name: string;
  decimals: number;
  symbol: string;
  thumbnailUri?: string;
  tezosTokenType?: string;
  tezosTokenId?: string;
}

export interface TokenMetadataInput extends TokenMetadata {
  tokenAddress: string;
}
