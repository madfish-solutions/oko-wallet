import { AccountTypeEnum } from '../enums/account-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const mockHdAccount: AccountInterface = {
  name: 'Account 1',
  type: AccountTypeEnum.HD_ACCOUNT,
  publicKey: 'publicKey',
  // Klaytn test account pkh
  publicKeyHash: '0x84757a438E06631f34b2199B5D9asdasd2e6865cE47D50',
  accountIndex: 0
};

export const initialAccount: AccountInterface = {
  name: '',
  type: AccountTypeEnum.HD_ACCOUNT,
  publicKey: '',
  publicKeyHash: '',
  accountIndex: 0
};
