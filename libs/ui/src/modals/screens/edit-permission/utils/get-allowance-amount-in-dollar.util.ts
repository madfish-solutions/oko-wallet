import { INFINITE_AMOUNT } from '../constatns';

import { checkIsMaxUintString } from './check-is-max-uint-string.util';

export const getAllowanceInDollar = (allowance: string, dollarAmount: string) =>
  checkIsMaxUintString(allowance) ? INFINITE_AMOUNT : dollarAmount;
