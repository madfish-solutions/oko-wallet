export interface TokenMetadata {
  name: string;
  decimals: number;
  symbol: string;
  thumbnailUri?: string;
  tezosTokenType?: string;
  artifactUri?: string;
  amount?: number;
  collectionId?: string | null;
  contractName?: string;
  innerId?: string;
}
