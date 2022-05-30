import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const mockHdAccount: AccountInterface = {
  name: 'Account 1',
  type: AccountTypeEnum.HD_ACCOUNT,
  accountIndex: 0,
  networksKeys: {
    [NetworkTypeEnum.Ethereum]: {
      publicKey: '',
      publicKeyHash: ''
    }
  },
  isVisible: true
};

export const initialAccount: AccountInterface = {
  name: '',
  type: AccountTypeEnum.HD_ACCOUNT,
  accountIndex: 0,
  networksKeys: {
    [NetworkTypeEnum.Ethereum]: {
      publicKey: '',
      publicKeyHash: ''
    }
  },
  isVisible: true
};
