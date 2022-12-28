import { BigNumber } from 'ethers';

import { DEFAULT_GAS_LIMIT } from '../constants/ethereum-gas-limit';

const GAS_LIMIT_MULTIPLIER = 1.2;

export const modifyGasLimit = (gasLimit: BigNumber | undefined | void) =>
  gasLimit === undefined ? DEFAULT_GAS_LIMIT : Math.floor(Number(gasLimit) * GAS_LIMIT_MULTIPLIER);
