import { TokenMetadata } from '../../../interfaces/token-metadata.interface';

export type TokenFromRoute = Record<string, Pick<TokenMetadata, 'symbol' | 'thumbnailUri'>>;
