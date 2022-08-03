import { Token } from '../../../interfaces/token.interface';

export const getListOfTokensAddresses = (accountTokens: Token[]) =>
  accountTokens.map(({ tokenAddress }) => tokenAddress);
