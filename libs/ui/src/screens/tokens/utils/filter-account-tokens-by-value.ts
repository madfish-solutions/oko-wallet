import { TokenOrGasToken } from '../../../interfaces/token.interface';

export const filterAccountTokensByValue = (accountTokensWithGasToken: TokenOrGasToken[], searchValue: string) =>
  accountTokensWithGasToken.filter(token => {
    const commonCondition =
      token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchValue.toLowerCase());
    const isToken = 'tokenAddress' in token;

    if (isToken) {
      return commonCondition || token.tokenAddress?.toLowerCase().includes(searchValue.toLowerCase());
    }

    return commonCondition;
  });
