import { AccountInterface } from '../../interfaces/account.interface';
import { Token } from '../../interfaces/token.interface';

export interface FormTypes {
  asset: Token;
  amount: string;
  receiverPublicKeyHash: string;
  selectedAccount?: AccountInterface;
  isTransferBetweenAccounts: boolean;
}
