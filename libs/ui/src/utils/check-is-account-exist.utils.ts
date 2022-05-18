import { NetworkTypeEnum } from '../enums/network-type.enum';
import { AccountInterface } from '../interfaces/account.interface';

export const checkIsNetworkTypeKeyExist = (account: AccountInterface, networkType: NetworkTypeEnum): boolean =>
  account.networks.hasOwnProperty(networkType);
