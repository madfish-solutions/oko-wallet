import { AccountInterface } from '../interfaces/account.interface';

import { getSlug } from './getSlug.uitl';

export const getAccountIdSlug = (account: AccountInterface) => getSlug(account.name, account.accountId.toString());
