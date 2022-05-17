export const getAccountAddressSlug = (networkRpcUrl: string, publicKeyHash: string) =>
  `${networkRpcUrl}_${publicKeyHash}`;
