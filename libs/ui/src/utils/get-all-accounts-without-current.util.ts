import { AccountInterface } from 'ui-types/interfaces/account.interface';

export const getAllAccountsWithoutCurrent = (allAccounts: AccountInterface[], selectedAccount: AccountInterface) =>
  allAccounts.filter(account => account.accountId !== selectedAccount.accountId);
