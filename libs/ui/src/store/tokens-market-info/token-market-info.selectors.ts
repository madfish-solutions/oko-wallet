import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getTokenMetadataSlug } from '../../utils/token-metadata.util';

import { TokensMarketInfoRootState, TokensMarketInfoState } from './tokens-market-info.state';

export const useTokensMarketInfoSelector = () =>
  useSelector<TokensMarketInfoRootState, TokensMarketInfoState['tokensPriceInfo']>(
    ({ tokensMarketInfo: { tokensPriceInfo } }) => tokensPriceInfo
  );

export const useTokenMarketInfoSelector = (tokenAddress: string, rpcUrl: string) => {
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const tokenMetadataSlug = getTokenMetadataSlug(rpcUrl, tokenAddress);

  return useMemo(() => allTokensMarketInfo[tokenMetadataSlug] ?? {}, [allTokensMarketInfo]);
};
