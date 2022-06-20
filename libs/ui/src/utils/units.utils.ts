import { BigNumberish } from 'ethers';
import { formatUnits as ethersFormatUnits } from 'ethers/lib/utils';

export const formatUnits = (value: BigNumberish, decimals?: number): string => ethersFormatUnits(value, decimals);
