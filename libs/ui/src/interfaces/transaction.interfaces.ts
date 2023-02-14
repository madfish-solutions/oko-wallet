import { TransactionStatusEnum } from '../enums/transactions.enum';

import { Asset } from './asset.interface';

export interface Transaction {
  status: TransactionStatusEnum;
  from: string;
  to: string;
  transactionHash: string;
  asset: Pick<Asset, 'tokenAddress' | 'tokenId' | 'standard'>;
}

export type PendingTransaction = Omit<Transaction, 'status'>;
