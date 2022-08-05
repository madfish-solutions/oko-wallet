import { BigNumber } from 'bignumber.js';
import { BigNumberish, ethers } from 'ethers';
import { formatUnits as ethersFormatUnits } from 'ethers/lib/utils';

export const formatUnits = (value: BigNumberish, decimals?: number): string => ethersFormatUnits(value, decimals);

export const tezosFormatUnits = (value: string | number | BigNumber, decimals = 6) =>
  new BigNumber(ethers.utils.parseUnits(value.toString(), decimals).toString());
