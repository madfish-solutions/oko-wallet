import { AccountToken } from './account-token.interface';
import { TokenMetadata } from './token-metadata.interface';

export type GasTokenMetadata = Pick<TokenMetadata, 'name' | 'decimals' | 'symbol' | 'thumbnailUri'>;

export type Token = AccountToken & TokenMetadata;

export type TokenWithFiatBalance = Token & { fiatBalance: string };
