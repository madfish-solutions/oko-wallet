export const getAccountTokensSlug = (networkRpcUrl: string, publicKeyHash: string) =>
  `${networkRpcUrl}_${publicKeyHash}`;
