import { isNotEmptyString } from '@rnw-community/shared';

export const getTokenMetadataSlug = (networkRpcUrl: string, tokenAddress: string, tokenId?: string) =>
  `${networkRpcUrl}_${tokenAddress}_${isNotEmptyString(tokenId) ? tokenId : '0'}`;
