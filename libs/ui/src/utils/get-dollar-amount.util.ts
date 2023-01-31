import { isEmptyString, isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';

import { TOKEN_DOLLAR_VALUE_PLUG } from '../constants/defaults';

import { formatUnits } from './units.utils';

interface GetDollarValueArgs {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: string | BigNumber;
  toFixed?: boolean;
  isNeedToFormat?: boolean;
}

export function getDollarValue(arg: {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: string;
  isNeedToFormat?: boolean;
}): string;

export function getDollarValue(arg: {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: BigNumber;
  isNeedToFormat?: boolean;
  toFixed: false;
}): BigNumber;

export function getDollarValue({
  amount,
  price,
  decimals,
  toFixed = true,
  isNeedToFormat = true,
  errorValue = TOKEN_DOLLAR_VALUE_PLUG
}: GetDollarValueArgs) {
  const bigNumAmount = isNeedToFormat ? formatUnits(amount, decimals) : new BigNumber(amount);

  if (isEmptyString(amount) || !isDefined(price) || bigNumAmount.isNaN()) {
    return errorValue;
  }

  const dollarValue = bigNumAmount.multipliedBy(price);

  return toFixed ? dollarValue.toFixed(2) : dollarValue;
}
