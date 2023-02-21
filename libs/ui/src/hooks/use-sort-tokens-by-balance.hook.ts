import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { Token } from '../interfaces/token.interface';
import { getFormattedBalance } from '../utils/units.utils';

export const useSortAccountTokensByBalance = (tokens: Token[]): Token[] =>
  useMemo(
    () =>
      tokens.sort((a, b) => {
        if (a.tokenAddress === GAS_TOKEN_ADDRESS) {
          return -1;
        }
        if (b.tokenAddress === GAS_TOKEN_ADDRESS) {
          return 1;
        }

        const zeroBalances = new BigNumber(a.fiatBalance ?? 0).eq(0) && new BigNumber(b.fiatBalance ?? 0).eq(0);
        const isVisibleToken = a.isVisible && b.isVisible;

        if (!zeroBalances && isVisibleToken) {
          return Number(b.fiatBalance) - Number(a.fiatBalance);
        }

        if (zeroBalances && isVisibleToken) {
          return (
            Number(getFormattedBalance(b.balance.data, b.decimals)) -
            Number(getFormattedBalance(a.balance.data, a.decimals))
          );
        }

        return Number(b.isVisible) - Number(a.isVisible);
      }),
    [tokens]
  );
