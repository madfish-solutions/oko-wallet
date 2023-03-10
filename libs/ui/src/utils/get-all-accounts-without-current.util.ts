import { AccountInterface } from 'shared';

export const getAllAccountsWithoutCurrent = (allAccounts: AccountInterface[], selectedAccount: AccountInterface) =>
  allAccounts.filter(account => account.accountId !== selectedAccount.accountId);
