export const getAccountTokensSlug = (networkChainId: string, publicKeyHash: string) =>
  `${networkChainId}_${publicKeyHash}`;
