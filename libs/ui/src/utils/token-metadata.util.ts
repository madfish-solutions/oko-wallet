import { isNotEmptyString } from '@rnw-community/shared';

export const getTokenMetadataSlug = (chainId: string, tokenAddress: string, tokenId?: string) =>
  `${chainId}_${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;
