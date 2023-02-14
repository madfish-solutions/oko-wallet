import { AccountTypeEnum } from '../enums/account-type.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';

type AccountByNetworkType = {
  publicKey: string;
  publicKeyHash: string;
};

export interface AccountInterface {
  name: string;
  type: AccountTypeEnum;
  accountId: number;
  networksKeys: Partial<{ [key in NetworkTypeEnum]: AccountByNetworkType }>;
  isVisible: boolean;
}
