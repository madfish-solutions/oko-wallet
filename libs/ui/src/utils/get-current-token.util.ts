import { Token } from '../interfaces/token.interface';

import { getTokenSlug } from './token.utils';

export const getCurrentToken = (tokens: Token[], findableTokenSlug: string) =>
  tokens.find(token => getTokenSlug(token.tokenAddress, token.tokenId) === findableTokenSlug);
