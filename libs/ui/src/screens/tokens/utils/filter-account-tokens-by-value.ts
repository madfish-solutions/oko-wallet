import { GAS_TOKEN_ADDRESS } from '../../../constants/defaults';
import { Token } from '../../../interfaces/token.interface';

export const filterAccountTokensByValue = (tokens: Token[], searchValue: string) =>
  tokens.filter(token => {
    const commonCondition =
      token.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchValue.toLowerCase());

    const isGasToken = token.tokenAddress === GAS_TOKEN_ADDRESS;

    if (isGasToken) {
      return commonCondition;
    }

    return commonCondition || token.tokenAddress?.toLowerCase().includes(searchValue.toLowerCase());
  });
