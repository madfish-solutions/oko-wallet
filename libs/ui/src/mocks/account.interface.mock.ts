import { AccountTypeEnum } from '../enums/account-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const mockHdAccount: AccountInterface = {
  name: 'Mock HD Account',
  type: AccountTypeEnum.HD_ACCOUNT,
  publicKey: 'publicKey',
  // Klaytn test account pkh
  publicKeyHash: '0x84757a438E06631f34b2199B5D92e6865cE47D50'
};

export const initialAccount: AccountInterface = {
  name: '',
  type: AccountTypeEnum.HD_ACCOUNT,
  publicKey: '',
  publicKeyHash: ''
};
