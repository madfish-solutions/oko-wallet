import { hexlify, parseUnits } from 'ethers/lib/utils';

export const getAmount = (value: string, decimals: number) => hexlify(parseUnits(value, decimals));
