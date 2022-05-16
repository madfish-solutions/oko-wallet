import { AccountInterface } from '../interfaces/account.interface';

export const getActualAccountIndex = (accounts: AccountInterface[]) => {
  const indexes = accounts.map(account => account.accountIndex);

  return Math.max.apply(null, indexes) + 1;
};
