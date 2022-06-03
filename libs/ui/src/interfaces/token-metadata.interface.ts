export interface TokenMetadata {
  name: string;
  decimals: number;
  symbol: string;
  thumbnailUri?: string;
  tezosTokenType?: string;
}

export interface TokenMetadataInput extends TokenMetadata {
  tokenAddress: string;
  tokenId?: string;
}
