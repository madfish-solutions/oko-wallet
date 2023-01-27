import { Token, TokenWithFiatBalance } from '../../../interfaces/token.interface';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';

export const filterAccountTokensByValue = (tokens: Token[] | TokenWithFiatBalance[], searchValue: string) =>
  tokens.filter(token => {
    const commonCondition =
      token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      token?.symbol?.toLowerCase().includes(searchValue.toLowerCase());

    const isGasToken = checkIsGasToken(token.tokenAddress);

    if (isGasToken) {
      return commonCondition;
    }

    return commonCondition || token.tokenAddress?.toLowerCase().includes(searchValue.toLowerCase());
  });
