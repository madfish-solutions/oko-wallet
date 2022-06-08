import { TransactionRequest as EvmTransferParams, TransactionResponse } from '@ethersproject/abstract-provider';

export interface GetEvmSignerParams {
  publicKey: string;
  rpcUrl: string;
  successCallback: (arg: TransactionResponse) => void;
  transactionParams: EvmTransferParams;
}
