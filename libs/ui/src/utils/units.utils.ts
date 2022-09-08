import { BigNumber } from 'bignumber.js';
import { BigNumberish } from 'ethers';

export const formatUnits = (value: BigNumberish, decimals: number): string => {
  const bigNum = new BigNumber(value.toString());

  if (bigNum.isNaN()) {
    return bigNum.toString();
  }

  return bigNum.integerValue().div(new BigNumber(10).pow(decimals)).toString(10);
};

export const parseUnits = (value: BigNumberish, decimals: number) => {
  const bigNum = new BigNumber(value.toString());

  if (bigNum.isNaN()) {
    return bigNum;
  }

  return bigNum.decimalPlaces(decimals).times(new BigNumber(10).pow(decimals));
};

export const formatBalances = (amount: number): string => {
  if (Number.isInteger(amount)) {
    return amount.toString();
  }
  if (amount > 1000) {
    return amount.toFixed(2);
  }

  return amount.toFixed(6);
};
