import { NetworkTypeEnum, AccountInterface } from 'shared';

export const checkIsNetworkTypeKeyExist = (account: AccountInterface, networkType: NetworkTypeEnum): boolean =>
  account.networksKeys.hasOwnProperty(networkType);
