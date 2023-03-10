import { AccountTypeEnum, NetworkTypeEnum, AccountInterface } from 'shared';

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
