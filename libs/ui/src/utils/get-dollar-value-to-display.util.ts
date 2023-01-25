import { BigNumber } from 'bignumber.js';

import { TOKEN_DOLLAR_VALUE_PLUG } from '../constants/defaults';

export const getFiatBalanceToDisplay = (tokenBalance: BigNumber, dollarValue: string): string => {
  const dollarValueBN = new BigNumber(dollarValue);

  return tokenBalance.gt(0) && dollarValueBN.eq(0) ? TOKEN_DOLLAR_VALUE_PLUG : dollarValueBN.toFixed(2);
};
