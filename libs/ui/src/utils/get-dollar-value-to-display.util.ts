import { BigNumber } from 'bignumber.js';

import { TOKEN_DOLLAR_VALUE_PLUG } from '../constants/defaults';

export const getFiatBalanceToDisplay = (tokenBalance: string, dollarValue: number): string =>
  new BigNumber(tokenBalance).gt(0) && new BigNumber(dollarValue).eq(0)
    ? TOKEN_DOLLAR_VALUE_PLUG
    : dollarValue.toFixed(2);
