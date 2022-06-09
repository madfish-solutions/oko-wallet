import { TransactionRequest as EvmTransferParams, TransactionResponse } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';

export interface GetEvmSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<TransactionResponse>;
  transactionParams: EvmTransferParams;
}
