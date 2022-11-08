import { BigNumber } from 'ethers';

import { DEFAULT_GAS_LIMIT } from '../constants/ethereum-gas-limit';

export const modifyGasLimit = (gasLimit: BigNumber | undefined | void) =>
  gasLimit === undefined ? DEFAULT_GAS_LIMIT : Number(gasLimit) * 1.5;
