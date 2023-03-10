import { AccountInterface } from 'shared';

export interface AccountsTransformer {
  hd: AccountInterface[];
  imported: AccountInterface[];
  ledger: AccountInterface[];
}
