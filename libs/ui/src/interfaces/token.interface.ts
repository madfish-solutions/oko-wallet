import { BigNumber } from 'bignumber.js';

import { AccountToken } from './account-token.interface';
import { TokenMetadata } from './token-metadata.interface';

export type GasTokenMetadata = Pick<TokenMetadata, 'name' | 'decimals' | 'symbol' | 'thumbnailUri'>;

export type Token = AccountToken & TokenMetadata;

export type TokenWithBalance = Token & { valueInDollar: string };
export type TokenWithBigNumberBalance = Token & { valueInDollar: BigNumber };
