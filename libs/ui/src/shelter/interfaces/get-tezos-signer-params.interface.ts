import { OnEventFn } from '@rnw-community/shared';
import { BatchOperation, TransferParams as TezosTransferParams } from '@taquito/taquito';

export interface GetTezosSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<BatchOperation>;
  transactionParams: TezosTransferParams;
}
