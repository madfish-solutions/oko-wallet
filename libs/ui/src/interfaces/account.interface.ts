import { AccountTypeEnum } from '../enums/account-type.enum';

export type AccountByNetworkType = {
  publicKey: string;
  publicKeyHash: string;
};

export interface AccountInterface {
  name: string;
  type: AccountTypeEnum;
  accountIndex: number;
  networks: Record<string, AccountByNetworkType>;
  isVisible?: boolean;
}
