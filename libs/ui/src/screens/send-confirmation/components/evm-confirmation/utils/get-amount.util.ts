import { ethers } from 'ethers';

export const getAmount = (value: string, decimals: number) => ethers.utils.parseUnits(value, decimals);
