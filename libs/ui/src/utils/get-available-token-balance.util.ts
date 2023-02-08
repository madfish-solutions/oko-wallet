import { Token } from '../interfaces/token.interface';
import { GAS_CONSUMPTION_FOR_SWAP } from '../screens/swap/constants';

import { checkIsGasToken } from './check-is-gas-token.util';
import { formatUnits } from './units.utils';

export const getAvailableTokenBalance = (token: Token, chainId: string, isSwapScreen: boolean) => {
  const availableBalance = formatUnits(token.balance.data, token.decimals);
  let maxAmount = availableBalance.toString(10);

  const isGasToken = checkIsGasToken(token.tokenAddress);
  const gasConsumptionValue = GAS_CONSUMPTION_FOR_SWAP[chainId];

  if (isGasToken && gasConsumptionValue && isSwapScreen) {
    const availableBalanceWithConsumption = availableBalance.minus(gasConsumptionValue);
    maxAmount = availableBalanceWithConsumption.gt(0) ? availableBalanceWithConsumption.toString(10) : '0';
  }

  return maxAmount;
};
