import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const mockHdAccount: AccountInterface = {
  name: 'Account 1',
  type: AccountTypeEnum.HD_ACCOUNT,
  accountIndex: 0,
  networks: {
    [NetworkTypeEnum.Ethereum]: {
      publicKey: 'publicKey',
      publicKeyHash: '0x84757a438E06631f34b2199B5D9asdasd2e6865cE47D50'
    }
  },
  isVisible: true
};

export const initialAccount: AccountInterface = {
  name: '',
  type: AccountTypeEnum.HD_ACCOUNT,
  accountIndex: 0,
  networks: {
    [NetworkTypeEnum.Ethereum]: {
      publicKey: '',
      publicKeyHash: ''
    }
  },
  isVisible: true
};
