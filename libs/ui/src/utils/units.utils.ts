import { formatUnits as ethersFormatUnits } from 'ethers/lib/utils';

export const formatUnits = (value: string, decimals?: number): string => ethersFormatUnits(value, decimals);
