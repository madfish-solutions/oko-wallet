import { BigNumber } from 'bignumber.js';

export const mutezToTz = (bigNum: BigNumber, decimals: number) => {
  if (bigNum.isNaN()) {
    return bigNum;
  }

  return bigNum.integerValue().div(new BigNumber(10).pow(decimals));
};
