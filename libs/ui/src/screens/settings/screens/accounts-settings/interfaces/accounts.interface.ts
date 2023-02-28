import { AccountInterface } from '../../../../../interfaces/account.interface';

export interface AccountsTransformer {
  hd: AccountInterface[];
  imported: AccountInterface[];
  ledger: AccountInterface[];
}
