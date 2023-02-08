import { BigNumberish } from 'ethers';

import { GAS_LIMIT_MULTIPLIER, EMPTY_GAS } from '../../../constants';
import { DEFAULT_GAS_LIMIT } from '../constants/ethereum-gas-limit';

export const modifyGasLimit = (gasLimit: BigNumberish | undefined | void, gas: number) => {
  if (gas > EMPTY_GAS) {
    return gas;
  }

  const calculatedGasLimit = Math.floor(Number(gasLimit) * GAS_LIMIT_MULTIPLIER);

  return gasLimit === undefined ? DEFAULT_GAS_LIMIT : calculatedGasLimit;
};
