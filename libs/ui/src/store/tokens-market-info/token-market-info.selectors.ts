import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getTokenMetadataSlug } from '../../utils/token-metadata.util';
import { checkEquality } from '../utils/check-equality.util';

import { TokensMarketInfoRootState, TokensMarketInfoState } from './tokens-market-info.state';

export const useTokensMarketInfoSelector = () =>
  useSelector<TokensMarketInfoRootState, TokensMarketInfoState['tokensPriceInfo']>(
    ({ tokensMarketInfo: { tokensPriceInfo } }) => tokensPriceInfo,
    checkEquality
  );

export const useTokenMarketInfoSelector = (tokenAddress: string, chainId: string) => {
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const tokenMetadataSlug = getTokenMetadataSlug(chainId, tokenAddress);

  return useMemo(() => allTokensMarketInfo[tokenMetadataSlug] ?? {}, [allTokensMarketInfo]);
};
