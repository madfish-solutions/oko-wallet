import { isNotEmptyString } from '@rnw-community/shared';

export const getTokenMetadataSlug = (networkChainId: string, tokenAddress: string, tokenId?: string) =>
  `${networkChainId}_${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;
