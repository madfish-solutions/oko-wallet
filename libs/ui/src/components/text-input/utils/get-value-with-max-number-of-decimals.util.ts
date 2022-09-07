import { BigNumber } from 'bignumber.js';

const MIN_VALUE = new BigNumber(0);
const MAX_VALUE = new BigNumber(Number.MAX_SAFE_INTEGER);

export const getValueWithMaxNumberOfDecimals = (value: string, decimals: number) => {
  const newValue = new BigNumber(value || 0).decimalPlaces(decimals);

  if (newValue.gte(MIN_VALUE) && newValue.lte(MAX_VALUE)) {
    const indexOfDot = value.indexOf('.');
    const decimalsCount = indexOfDot === -1 ? 0 : value.length - indexOfDot - 1;

    return decimalsCount > decimals ? value.substring(0, indexOfDot + decimals + 1) : value;
  }

  return value.slice(0, -1);
};
