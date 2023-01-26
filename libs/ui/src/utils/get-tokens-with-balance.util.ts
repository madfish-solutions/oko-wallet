import { TokenWithFiatBalance } from '../interfaces/token.interface';

export const getTokensWithBalance = (tokens: TokenWithFiatBalance[]) =>
  tokens.filter(visibleAccountToken => Number(visibleAccountToken.balance.data) > 0);
