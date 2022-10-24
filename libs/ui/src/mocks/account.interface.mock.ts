import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const initialAccount: AccountInterface = {
  name: '',
  type: AccountTypeEnum.HD_ACCOUNT,
  accountId: 0,
  networksKeys: {
    [NetworkTypeEnum.EVM]: {
      publicKey: '',
      publicKeyHash: ''
    }
  },
  isVisible: true
};
