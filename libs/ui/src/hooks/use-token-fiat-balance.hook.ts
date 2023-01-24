import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';

import { Token } from '../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getAvailableTokenBalance } from '../utils/get-available-token-balance.util';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';
import { getFormattedBalance } from '../utils/units.utils';

const zeroAmount = '0.00';

export const useTokenFiatBalance = (amount: string, token: Token | undefined, isSwapScreen = false) => {
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();

  return useMemo(() => {
    const balance = {
      availableFormattedBalance: zeroAmount,
      availableBalance: zeroAmount,
      availableUsdBalance: zeroAmount,
      amountInDollar: zeroAmount
    };

    if (isDefined(token)) {
      const price =
        allTokensMarketInfoSelector[getTokenMetadataSlug(chainId, token.tokenAddress, token.tokenId)]?.price;
      balance.availableBalance = getAvailableTokenBalance(token, chainId, isSwapScreen);
      balance.availableFormattedBalance = getFormattedBalance(token.balance.data, token.decimals);
      balance.availableUsdBalance = getDollarValue({
        amount: balance.availableBalance,
        decimals: token.decimals,
        price,
        isNeedToFormat: false
      });
      balance.amountInDollar = getDollarValue({
        amount,
        decimals: token.decimals,
        price,
        errorValue: isDefined(price) ? zeroAmount : undefined,
        isNeedToFormat: false
      });
    }

    return balance;
  }, [token, allTokensMarketInfoSelector, chainId, amount]);
};
