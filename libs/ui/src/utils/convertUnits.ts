import BN from 'bignumber.js';

export const convertUnits = (n: number | string | BN, unit: number | BN = 18, fixedDecimals = false) => {
  const val = new BN(n).div(new BN(10).pow(unit));

  if (new BN(unit).gte(0) && fixedDecimals) {
    return val.decimalPlaces(+unit, BN.ROUND_DOWN);
  }

  return val;
};
