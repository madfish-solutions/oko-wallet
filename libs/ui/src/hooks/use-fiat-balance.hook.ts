import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';

import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import {
  useSelectedNetworkSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../store/wallet/wallet.selectors';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

export const useFiatBalance = () => {
  const { chainId } = useSelectedNetworkSelector();
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const visibleAccountTokensAndGasToken = useVisibleAccountTokensAndGasTokenSelector();

  return useMemo(
    () =>
      visibleAccountTokensAndGasToken
        .reduce((sum, accountToken) => {
          const tokenMetadataSlug = getTokenMetadataSlug(chainId, accountToken.tokenAddress);
          const { price } = allTokensMarketInfoSelector[tokenMetadataSlug] ?? {};

          const dollarValue = getDollarValue({
            amount: accountToken.balance?.data,
            decimals: accountToken.decimals,
            price,
            errorValue: new BigNumber(0),
            toFixed: false
          });

          return dollarValue.plus(sum);
        }, new BigNumber(0))
        .toFixed(2),
    [visibleAccountTokensAndGasToken, chainId]
  );
};
