import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';

export type AccountByNetworkType = {
  publicKey: string;
  publicKeyHash: string;
};

export interface AccountInterface {
  name: string;
  type: AccountTypeEnum;
  accountIndex: number;
  networksKeys: Partial<{ [key in NetworkTypeEnum]: AccountByNetworkType }>;
  isVisible?: boolean;
}
