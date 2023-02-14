import { NetworkTypeEnum } from 'ui-types/enums/network-type.enum';
import { AccountInterface } from 'ui-types/interfaces/account.interface';

export const checkIsNetworkTypeKeyExist = (account: AccountInterface, networkType: NetworkTypeEnum): boolean =>
  account.networksKeys.hasOwnProperty(networkType);
