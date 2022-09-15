import { isEmptyString, isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';

import { formatUnits } from './units.utils';

interface GetDollarValueArgs {
  amount: string;
  decimals: number;
  price: number | undefined;
  errorValue?: string | BigNumber;
  toFixed?: boolean;
  isNeedToFormat?: boolean;
}

export const getDollarValue = ({
  amount,
  price,
  decimals,
  toFixed = true,
  isNeedToFormat = true,
  errorValue = '---'
}: GetDollarValueArgs): string | BigNumber => {
  const bigNumAmount = isNeedToFormat ? formatUnits(amount, decimals) : new BigNumber(amount);

  if (isEmptyString(amount) || !isDefined(price) || bigNumAmount.isNaN()) {
    return errorValue;
  }

  const dollarValue = bigNumAmount.multipliedBy(price);

  return toFixed ? dollarValue.toFixed(2) : dollarValue;
};
