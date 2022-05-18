import { AccountToken } from './account-token.interface';
import { TokenMetadata } from './token-metadata.interface';

export type GasTokenMetadata = Omit<TokenMetadata, 'tokenAddress'>;

export type Token = AccountToken & TokenMetadata;
