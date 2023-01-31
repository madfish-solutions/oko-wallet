import { BigNumber } from 'bignumber.js';
import { useMemo } from 'react';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { Token } from '../interfaces/token.interface';
import { getFormattedBalance } from '../utils/units.utils';

export const useSortAccountTokensByBalance = (tokens: Token[]): Token[] =>
  useMemo(
    () =>
      tokens.sort((a, b) => {
        const zeroBalances = new BigNumber(a.fiatBalance ?? 0).eq(0) && new BigNumber(b.fiatBalance ?? 0).eq(0);

        if (a.tokenAddress === GAS_TOKEN_ADDRESS) {
          return -1;
        }
        if (b.tokenAddress === GAS_TOKEN_ADDRESS) {
          return 1;
        }

        if (zeroBalances) {
          const tokenBalanceA = getFormattedBalance(a.balance.data, a.decimals);
          const tokenBalanceB = getFormattedBalance(b.balance.data, b.decimals);

          return Number(tokenBalanceB) - Number(tokenBalanceA);
        }

        return Number(b.fiatBalance) - Number(a.fiatBalance);
      }),
    [tokens]
  );
