import { AccountTypeEnum } from '../enums/account-type.enum';

export type AccountByNetworkType = {
  publicKey: string;
  publicKeyHash: string;
};

type NetworkType = string;

export interface AccountInterface {
  name: string;
  type: AccountTypeEnum;
  accountIndex: number;
  networksKeys: Record<NetworkType, AccountByNetworkType>;
  isVisible?: boolean;
}
