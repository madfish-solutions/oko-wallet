import { useSelector } from 'react-redux';

import { TokensRootState, TokensState } from './tokens-state';

export const useTokensListSelector = () =>
  useSelector<TokensRootState, TokensState['list']>(({ tokens }) => tokens.list);
