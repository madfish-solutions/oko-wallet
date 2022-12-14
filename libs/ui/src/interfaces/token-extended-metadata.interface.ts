import { AccountToken } from './account-token.interface';
import { TokenMetadata } from './token-metadata.interface';

export interface TokenExtendedMetadata extends TokenMetadata, Pick<AccountToken, 'tokenAddress' | 'tokenId'> {}
