import { isDefined } from '@rnw-community/shared';

export const getBalanceToShow = (balance: string) => {
  const [balanceBeforeDot, balanceAfterDot] = balance.split('.');
  let correctedBalanceAfterDot = balanceAfterDot ?? '';

  if (balanceBeforeDot.length <= 3) {
    correctedBalanceAfterDot = correctedBalanceAfterDot.slice(0, 6);
  } else {
    correctedBalanceAfterDot = correctedBalanceAfterDot.slice(0, 2);
  }

  return isDefined(balanceAfterDot) ? `${balanceBeforeDot}.${correctedBalanceAfterDot}` : balance;
};
