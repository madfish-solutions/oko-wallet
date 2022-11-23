import { AccountToken } from './account-token.interface';
import { TokenMetadata } from './token-metadata.interface';

export interface AccountTokenInput extends TokenMetadata, Pick<AccountToken, 'tokenAddress' | 'tokenId'> {
  balance?: string;
}
