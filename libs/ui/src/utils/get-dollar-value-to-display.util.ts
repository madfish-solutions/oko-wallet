import { BigNumber } from 'bignumber.js';

import { TOKEN_DOLLAR_VALUE_PLUG } from '../constants/defaults';

export const getValueInDollarToDisplay = (tokenBalance: BigNumber, dollarValue: BigNumber): string =>
  tokenBalance.gt(0) && dollarValue.eq(0) ? TOKEN_DOLLAR_VALUE_PLUG : dollarValue.toFixed(2);
