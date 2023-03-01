import { Token } from '../../../../interfaces/token.interface';
import { OnSend } from '../../types';

export interface ConfirmOperationParams {
  confirmOperationParams: {
    onSend: OnSend;
    onDecline: () => void;
    isTransactionLoading: boolean;
    isFeeLoading: boolean;
    initialTransactionFee: number;
    storageFee?: number;
  };
}

export interface InternalSwapDetails {
  toToken: Token;
  toTokenAmount: string;
  exchangeRate: string;
}
