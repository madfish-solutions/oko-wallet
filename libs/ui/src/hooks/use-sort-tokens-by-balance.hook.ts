import { isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { Token, TokenWithFiatBalance } from '../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import { createEntity } from '../store/utils/entity.utils';
import { useSelectedNetworkSelector } from '../store/wallet/wallet.selectors';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';
import { getFormattedBalance } from '../utils/units.utils';

export const useSortAccountTokensByBalance = (tokens: Token[]): TokenWithFiatBalance[] => {
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const { chainId } = useSelectedNetworkSelector();

  const tokensWithDollarBalance = tokens.map(asset => {
    const tokenMetadataSlug = getTokenMetadataSlug(chainId, asset.tokenAddress);

    const fiatBalance = getDollarValue({
      amount: asset.balance?.data ?? 0,
      price: isDefined(allTokensMarketInfo[tokenMetadataSlug]) ? allTokensMarketInfo[tokenMetadataSlug].price : 0,
      decimals: asset.decimals,
      toFixed: false
    });

    return {
      ...asset,
      fiatBalance: fiatBalance.toString()
    };
  });

  const gasToken = tokensWithDollarBalance.find(({ tokenAddress }) => tokenAddress === GAS_TOKEN_ADDRESS);

  const allTokens = useMemo(
    () =>
      tokensWithDollarBalance
        .filter(({ tokenAddress }) => tokenAddress !== GAS_TOKEN_ADDRESS)
        .reduce(
          (
            acc: { tokensWithBalance: TokenWithFiatBalance[]; tokensWithZeroBalance: TokenWithFiatBalance[] },
            currentToken: TokenWithFiatBalance
          ) => {
            const fiatBalance = new BigNumber(currentToken.fiatBalance);

            if (fiatBalance.gt(0)) {
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
      ...tokensWithBalance
        .map(token => ({ ...token, balance: createEntity(getFormattedBalance(token.balance.data, token.decimals)) }))
        .sort((a, b) => Number(b.fiatBalance) - Number(a.fiatBalance)),
      ...tokensWithZeroBalance
        .map(token => ({ ...token, balance: createEntity(getFormattedBalance(token.balance.data, token.decimals)) }))
        .sort((a, b) => Number(b.balance.data) - Number(a.balance.data))
    ],
    [tokensWithBalance, tokensWithZeroBalance]
  );

  if (isDefined(gasToken)) {
    return [
      { ...gasToken, balance: createEntity(getFormattedBalance(gasToken.balance.data, gasToken.decimals)) },
      ...sortedAccountTokens
    ];
  }

  return sortedAccountTokens;
};
