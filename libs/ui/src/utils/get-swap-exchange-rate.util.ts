import { Token } from '../interfaces/token.interface';

import { formatUnits } from './units.utils';

export const getSwapExchangeRate = (
  fromToken: Token,
  fromTokenAmount: string,
  toToken: Token,
  toTokenAmount: string
) => {
  const exchangeRate = formatUnits(toTokenAmount, toToken.decimals)
    .div(formatUnits(fromTokenAmount, fromToken.decimals))
    .toFixed(4);

  return `1 ${fromToken.symbol} = ${exchangeRate} ${toToken.symbol}`;
};
