export const getAccountTokenSlug = (networkRpcUrl: string, publicKeyHash: string) =>
  `${networkRpcUrl}_${publicKeyHash}`;
