import { AccountTypeEnum } from '../../enums/account-type.enum';

export interface AccountInterface {
  name: string;
  type: AccountTypeEnum;
  publicKey: string;
  publicKeyHash: string;
}
