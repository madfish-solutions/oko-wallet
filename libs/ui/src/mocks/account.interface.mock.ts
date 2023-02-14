import { AccountTypeEnum } from 'ui-types/enums/account-type.enum';
import { NetworkTypeEnum } from 'ui-types/enums/network-type.enum';
import { AccountInterface } from 'ui-types/interfaces/account.interface';

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
