import { AccountInterface } from '../interfaces/account.interface';

export const getAllAccountsWithoutCurrent = (allAccounts: AccountInterface[], selectedAccount: AccountInterface) =>
  allAccounts.filter(account => account.accountIndex !== selectedAccount.accountIndex);
