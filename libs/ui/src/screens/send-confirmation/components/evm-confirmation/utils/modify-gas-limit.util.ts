import { BigNumberish } from 'ethers';

import { DEFAULT_GAS_LIMIT } from '../constants/ethereum-gas-limit';

const GAS_LIMIT_MULTIPLIER = 1.2;

export const modifyGasLimit = (gasLimit: BigNumberish | undefined | void, gas: number) => {
  if (gas > 0) {
    return gas;
  }

  return gasLimit === undefined ? DEFAULT_GAS_LIMIT : Math.floor(Number(gasLimit) * GAS_LIMIT_MULTIPLIER);
};
