import { BatchOperation, TransferParams as TezosTransferParams } from '@taquito/taquito';

export interface GetTezosSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: (arg: BatchOperation) => void;
  transactionParams: TezosTransferParams;
}
