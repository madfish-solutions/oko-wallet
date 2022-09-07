import { AccountInterface } from '../../interfaces/account.interface';
import { Token } from '../../interfaces/token.interface';

export interface FormTypes {
  token: Token;
  amount: string;
  receiverPublicKeyHash: string;
  account?: AccountInterface;
  isTransferBetweenAccounts: boolean;
}
