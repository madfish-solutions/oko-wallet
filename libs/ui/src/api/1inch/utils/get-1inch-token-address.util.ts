import { GAS_TOKEN_ADDRESS } from '../../../constants/defaults';
import { ONE_INCH_GAS_TOKEN_ADDRESS } from '../constants';

export const get1inchTokenAddress = (tokenAddress: string) =>
  tokenAddress === GAS_TOKEN_ADDRESS ? ONE_INCH_GAS_TOKEN_ADDRESS : tokenAddress;
