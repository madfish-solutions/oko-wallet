export const getTokenMetadataSlug = (networkRpcUrl: string, tokenAddress: string, tokenId: string) =>
  `${networkRpcUrl}_${tokenAddress}_${tokenId}`;
