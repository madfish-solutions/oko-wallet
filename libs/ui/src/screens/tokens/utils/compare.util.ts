import { Token } from '../../../interfaces/token.interface';

export const checkTokenOnExist = (token: Token, searchValue: string) =>
  token.tokenAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
  token.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
  token.name.toLowerCase().includes(searchValue.toLowerCase());
