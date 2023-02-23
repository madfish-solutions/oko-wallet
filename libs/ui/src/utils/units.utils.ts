import { BigNumber } from 'bignumber.js';
import { BigNumberish } from 'ethers';

import { checkIsMaxUintString } from '../modals/screens/edit-permission/utils/check-is-max-uint-string.util';

export const formatUnits = (value: BigNumberish, decimals: number) => {
  const correctedValue = value ?? 0;
  const bigNum = new BigNumber(correctedValue?.toString());

  if (bigNum.isNaN()) {
    return bigNum;
  }

  return bigNum.integerValue().div(new BigNumber(10).pow(decimals));
};

export const formatUnitsToString = (value: BigNumberish, decimals: number) => formatUnits(value, decimals).toString(10);

export const parseUnits = (value: BigNumberish, decimals: number) => {
  const bigNum = new BigNumber(value.toString());

  if (bigNum.isNaN()) {
    return bigNum;
  }

  return bigNum.decimalPlaces(decimals).times(new BigNumber(10).pow(decimals));
};

export const formatBalances = (amount: number | string): string => {
  const correctedAmount = new BigNumber(amount);

  if (correctedAmount.isInteger()) {
    return amount.toString();
  }

  if (correctedAmount.gt(1000)) {
    return correctedAmount.toFixed(2);
  }

  if (correctedAmount.lt(0.000001)) {
    return '< 0.000001';
  }

  return correctedAmount.decimalPlaces(6).toFixed();
};

export const getFormattedBalance = (amount: BigNumberish, decimals: number) =>
  formatBalances(formatUnitsToString(amount, decimals));

export const getFormattedAllowance = (amount: BigNumberish, decimals: number) =>
  checkIsMaxUintString(amount.toString())
    ? formatUnits(amount, decimals).toExponential(10).toString()
    : formatUnitsToString(amount, decimals);
