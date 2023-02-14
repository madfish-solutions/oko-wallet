import { TokenStandardEnum } from 'ui-types/enums/token-standard.enum';

export interface TokenMetadata {
  name: string;
  decimals: number;
  symbol: string;
  thumbnailUri?: string;
  tezosTokenType?: string;
  artifactUri?: string;
  collectionId?: string | null;
  contractName?: string;
  collectionSize?: number;
  standard?: TokenStandardEnum;
}
