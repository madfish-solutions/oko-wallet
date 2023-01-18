import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';

import { Token } from '../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

export const useSortAccountTokensByBalance = (tokens: Token[]): Token[] => {
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();

  const assets = tokens.map(asset => {
    const tokenMetadataSlug = getTokenMetadataSlug(chainId, asset.tokenAddress);

    const dollarBalance = getDollarValue({
      amount: asset.balance?.data ?? 0,
      price: isDefined(allTokensMarketInfo[tokenMetadataSlug]) ? allTokensMarketInfo[tokenMetadataSlug].price : 0,
      decimals: asset.decimals
    });

    return {
      ...asset,
      dollarBalance
    };
  });

  return useMemo(() => assets.sort((a, b) => Number(b.dollarBalance) - Number(a.dollarBalance)), [tokens]);
};
