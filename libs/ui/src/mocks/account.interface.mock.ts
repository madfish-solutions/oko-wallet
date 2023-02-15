import { AccountTypeEnum } from 'shared/enums/account-type.enum';
import { NetworkTypeEnum } from 'shared/enums/network-type.enum';
import { AccountInterface } from 'shared/interfaces/account.interface';

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
