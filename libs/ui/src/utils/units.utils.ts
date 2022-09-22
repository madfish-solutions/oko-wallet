import { BigNumber } from 'bignumber.js';
import { BigNumberish } from 'ethers';

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
  const correctedAmount = typeof amount === 'string' ? Number(amount) : amount;

  if (Number.isInteger(correctedAmount)) {
    return amount.toString();
  }

  if (correctedAmount > 1000) {
    return correctedAmount.toFixed(2);
  }

  return correctedAmount.toFixed(6);
};

export const getFormattedBalance = (amount: BigNumberish, decimals: number) =>
  formatBalances(formatUnitsToString(amount, decimals));
