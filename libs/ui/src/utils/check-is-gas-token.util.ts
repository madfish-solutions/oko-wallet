import { GAS_TOKEN_ADDRESS } from '../constants/defaults';

export const checkIsGasToken = (tokenAddress: string) => tokenAddress === GAS_TOKEN_ADDRESS;
