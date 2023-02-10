import { parseUnits } from 'ethers/lib/utils';

export const getAmount = (value: string, decimals: number) => parseUnits(value, decimals).toString();
