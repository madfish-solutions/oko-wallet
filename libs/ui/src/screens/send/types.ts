import { AccountInterface } from 'shared';

import { Token } from '../../interfaces/token.interface';

export interface FormTypes {
  token?: Token;
  amount: string;
  receiverPublicKeyHash: string;
  account?: AccountInterface;
  isTransferBetweenAccounts: boolean;
}

export interface SendParams {
  account?: AccountInterface;
  token?: Token;
  receiverPublicKeyHash?: string;
}
