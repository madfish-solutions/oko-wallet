import { TransactionStatusEnum } from '../enums/transactions.enum';

import { Token } from './token.interface';

export interface Transaction {
  status: TransactionStatusEnum;
  from: string;
  to: string;
  transactionHash: string;
  token: Token;
}

export type PendingTransaction = Omit<Transaction, 'status'>;
