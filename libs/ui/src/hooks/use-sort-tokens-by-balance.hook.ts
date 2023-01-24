import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { Token, TokenWithBigNumberBalance } from '../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

export const useSortAccountTokensByBalance = (tokens: Token[]): TokenWithBigNumberBalance[] => {
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();

  const tokensWithDollarBalance = tokens.map(asset => {
    const tokenMetadataSlug = getTokenMetadataSlug(chainId, asset.tokenAddress);

    const valueInDollar = getDollarValue({
      amount: asset.balance?.data ?? 0,
      price: isDefined(allTokensMarketInfo[tokenMetadataSlug]) ? allTokensMarketInfo[tokenMetadataSlug].price : 0,
      decimals: asset.decimals,
      toFixed: false
    });

    return {
      ...asset,
      valueInDollar
    };
  });

  const gasToken = tokensWithDollarBalance.find(({ tokenAddress }) => tokenAddress === GAS_TOKEN_ADDRESS);

  const allTokens = useMemo(
    () =>
      tokensWithDollarBalance
        .filter(({ tokenAddress }) => tokenAddress !== GAS_TOKEN_ADDRESS)
        .reduce(
          (
            acc: { tokensWithBalance: TokenWithBigNumberBalance[]; tokensWithZeroBalance: TokenWithBigNumberBalance[] },
            currentToken: TokenWithBigNumberBalance
          ) => {
            if (currentToken.valueInDollar.gt(0)) {
              return {
                ...acc,
                tokensWithBalance: [...(acc.tokensWithBalance ?? []), currentToken]
              };
            }

            return {
              ...acc,
              tokensWithZeroBalance: [...(acc.tokensWithZeroBalance ?? []), currentToken]
            };
          },
          { tokensWithBalance: [], tokensWithZeroBalance: [] }
        ),
    [tokensWithDollarBalance, allTokensMarketInfo]
  );

  const { tokensWithBalance, tokensWithZeroBalance } = allTokens;

  const sortedAccountTokens = useMemo(
    () => [
      ...tokensWithBalance.sort((a, b) => Number(b.valueInDollar) - Number(a.valueInDollar)),
      ...tokensWithZeroBalance.sort((a, b) => Number(b.balance.data) - Number(a.balance.data))
    ],
    [tokensWithBalance, tokensWithZeroBalance]
  );

  if (isDefined(gasToken)) {
    return [gasToken, ...sortedAccountTokens];
  }

  return sortedAccountTokens;
};
