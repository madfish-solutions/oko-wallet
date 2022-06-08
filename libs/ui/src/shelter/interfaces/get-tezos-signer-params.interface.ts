import { BatchOperation, TransferParams as TezosTransferParams } from '@taquito/taquito';

export interface GetTezosSignerParams {
  rpcUrl: string;
  successCallback: (arg: BatchOperation) => void;
  transactionParams: TezosTransferParams;
}
