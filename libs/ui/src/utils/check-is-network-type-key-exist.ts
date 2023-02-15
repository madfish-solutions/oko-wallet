import { NetworkTypeEnum } from 'shared/enums/network-type.enum';
import { AccountInterface } from 'shared/interfaces/account.interface';

export const checkIsNetworkTypeKeyExist = (account: AccountInterface, networkType: NetworkTypeEnum): boolean =>
  account.networksKeys.hasOwnProperty(networkType);
