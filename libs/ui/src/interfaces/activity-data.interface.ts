import { TransactionStatusEnum } from '../enums/transactions.enum';

import { TransactionTypeEnum } from './activity.enum';

interface Transfer {
  amount: number;
  symbol: string;
}

export interface ActivityData {
  type: TransactionTypeEnum;
  hash: string;
  timestamp: number;
  label: string;
  status: TransactionStatusEnum;
  symbol?: string;
  amount?: number;
  transfer?: {
    receives: Transfer[];
    sends: Transfer[];
  };
  projectName?: string;
  tokenId?: string;
  isCollectible?: boolean;
}

export interface SectionListActivityData {
  title: string;
  data: ActivityData[];
}
