import { Token } from '../interfaces/token.interface';

export const getTokensWithBalance = (tokens: Token[]) =>
  tokens.filter(visibleAccountToken => Number(visibleAccountToken.balance.data) > 0);
